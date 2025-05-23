const express = require('express');
const cors = require('cors');
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const csvParse = require('csv-parse/sync');
const app = express();
const PORT = 4000;

const SHOP = "UPDATEshannon-2023-test.myshopify.com";
const ACCESS_TOKEN = "<insert api and shop>";
const API_VERSION = "2025-07";

const graphql_url = `https://${SHOP}/admin/api/${API_VERSION}/graphql.json`;
const headers = {
  "Content-Type": "application/json",
  "X-Shopify-Access-Token": ACCESS_TOKEN
};

const INVENTORY_CACHE_FILE = 'inventory_cache.json';
const CACHE_MAX_AGE_MS = 60 * 60 * 1000; // 1 hour

app.use(cors());
app.use(express.json());

// Utility to refresh inventory cache
async function refreshInventoryCache() {
  let products = [];
  let hasNextPage = true;
  let endCursor = null;
  while (hasNextPage) {
    const query = `{
      products(first: 100, query: "title:Dummy Product*"${endCursor ? `, after: \"${endCursor}\"` : ""}) {
        pageInfo { hasNextPage }
        edges {
          cursor
          node {
            id
            title
            variants(first: 100) {
              edges {
                node {
                  id
                  inventoryItem { id }
                }
              }
            }
          }
        }
      }
    }`;
    const resp = await axios.post(graphql_url, { query }, { headers });
    const data = resp.data.data.products;
    products = products.concat(data.edges.map(e => e.node));
    hasNextPage = data.pageInfo.hasNextPage;
    if (hasNextPage) {
      endCursor = data.edges[data.edges.length - 1].cursor;
    }
  }
  fs.writeFileSync(INVENTORY_CACHE_FILE, JSON.stringify(products, null, 2));
  console.log(`[CACHE] Refreshed inventory cache with ${products.length} products.`);
  return products.length;
}

app.post('/refresh-inventory-cache', async (req, res) => {
  try {
    const count = await refreshInventoryCache();
    res.json({ success: true, count });
  } catch (err) {
    res.status(500).json({ success: false, error: err.toString() });
  }
});

app.post('/create-products', async (req, res) => {
  try {
    // 1. Generate products.jsonl
    const lines = Array.from({ length: 30000 }, (_, i) => {
      const idx = i + 1;
      return JSON.stringify({
        input: {
          title: `Dummy Product ${idx}`,
          descriptionHtml: `<strong>Dummy description for product ${idx}</strong>`,
          vendor: "DummyVendor",
          productType: "DummyType"
        }
      });
    });
    fs.writeFileSync('products.jsonl', lines.join('\n'));

    // 2. Get staged upload URL from Shopify
    const stagedUploadQuery = `
      mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
        stagedUploadsCreate(input: $input) {
          stagedTargets {
            url
            resourceUrl
            parameters { name value }
          }
          userErrors { field message }
        }
      }
    `;
    const variables = {
      input: [{
        resource: "BULK_MUTATION_VARIABLES",
        filename: "products.jsonl",
        mimeType: "text/jsonl",
        httpMethod: "POST"
      }]
    };
    const stagedResp = await axios.post(graphql_url, { query: stagedUploadQuery, variables }, { headers });
    const stagedTarget = stagedResp.data.data.stagedUploadsCreate.stagedTargets[0];
    const upload_url = stagedTarget.url;
    const resource_url = stagedTarget.resourceUrl;
    const params = {};
    stagedTarget.parameters.forEach(p => { params[p.name] = p.value; });

    // 3. Upload the file to the staged upload URL
    const form = new FormData();
    Object.entries(params).forEach(([key, value]) => form.append(key, value));
    form.append('file', fs.createReadStream('products.jsonl'));
    await axios.post(upload_url, form, { headers: form.getHeaders() });

    // 4. Start the bulk operation
    const key = stagedTarget.parameters.find(p => p.name === 'key').value;

    const bulkMutation = `
      mutation {
        bulkOperationRunMutation(
          mutation: """
            mutation productCreate($input: ProductInput!) {
              productCreate(input: $input) {
                product { id }
                userErrors { field message }
              }
            }
          """,
          stagedUploadPath: "${key}"
        ) {
          bulkOperation { id status }
          userErrors { field message }
        }
      }
    `;
    const bulkResp = await axios.post(graphql_url, { query: bulkMutation }, { headers });

    res.json({ success: true, result: bulkResp.data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.toString() });
  }
});

app.post('/update-inventory', async (req, res) => {
  const startTime = Date.now();
  try {
    let products = [];
    // Only use cache, do not refresh
    if (fs.existsSync(INVENTORY_CACHE_FILE)) {
      products = JSON.parse(fs.readFileSync(INVENTORY_CACHE_FILE, 'utf8'));
      console.log(`[CACHE] Using cached inventory data (${products.length} products)`);
    } else {
      return res.status(400).json({ success: false, error: 'Inventory cache not found. Please refresh cache first.' });
    }

    // 2. Fetch your first location ID
    const locQuery = `
      {
        locations(first: 1) {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `;
    const locResp = await axios.post(graphql_url, { query: locQuery }, { headers });
    const locationId = locResp.data.data.locations.edges[0].node.id;
    console.log(`Using locationId: ${locationId}`);

    // 3. Prepare inventory update data
    const BATCH_SIZE = 50;
    let allSetQuantities = products.flatMap(product =>
      product.variants.edges.map(variantEdge => ({
        inventoryItemId: variantEdge.node.inventoryItem.id,
        locationId,
        quantity: Math.floor(Math.random() * 2000) + 1
      }))
    );
    console.log(`Total inventory items to update: ${allSetQuantities.length}`);

    // Step 1: Enable tracking in parallel batches using full available query cost
    let enableResults = [];
    let enableBatchIndex = 0;
    let availableQueryCost = 20000; // start with max
    let stuckRetries = 0;
    const MAX_STUCK_RETRIES = 120; // 1 minute at 500ms intervals
    let enableItems = allSetQuantities.slice();
    const HARD_ALIAS_CAP = 100; // Shopify's mutation alias limit
    while (enableItems.length > 0) {
      // Calculate how many full batches we can send in parallel
      let maxBatchSize = Math.min(HARD_ALIAS_CAP, enableItems.length);
      let maxBatches = Math.floor(availableQueryCost / (maxBatchSize * 10));
      if (maxBatchSize === 0 || maxBatches === 0) {
        stuckRetries++;
        if (stuckRetries > MAX_STUCK_RETRIES) {
          throw new Error('Stuck waiting for query cost to restore. Aborting.');
        }
        console.log(`[WAIT] Not enough query cost. Current: ${availableQueryCost}, Needed: ${maxBatchSize * 10}. Waiting 500ms...`);
        // Make a lightweight request to get the latest throttle status
        try {
          const throttleResp = await axios.post(graphql_url, { query: '{ shop { id } }' }, { headers });
          if (throttleResp.data.extensions && throttleResp.data.extensions.cost && throttleResp.data.extensions.cost.throttleStatus) {
            const throttle = throttleResp.data.extensions.cost.throttleStatus;
            availableQueryCost = throttle.currentlyAvailable;
            console.log(`[THROTTLE-WAIT] Polled: max: ${throttle.maximumAvailable}, current: ${throttle.currentlyAvailable}, restoreRate: ${throttle.restoreRate}`);
          }
        } catch (err) {
          console.log('[THROTTLE-WAIT] Error polling throttle status:', err.response ? err.response.data : err);
        }
        await new Promise(r => setTimeout(r, 500));
        continue;
      } else {
        stuckRetries = 0;
      }
      // Prepare parallel batches
      let batchPromises = [];
      let batchesThisRound = Math.min(maxBatches, Math.ceil(enableItems.length / maxBatchSize));
      for (let b = 0; b < batchesThisRound; b++) {
        const batch = enableItems.slice(b * maxBatchSize, (b + 1) * maxBatchSize);
        let mutationParts = [];
        batch.forEach((item, idx) => {
          mutationParts.push(`t${idx}: inventoryItemUpdate(id: "${item.inventoryItemId}", input: {tracked: true}) { inventoryItem { id tracked } userErrors { message } }`);
        });
        const enableTrackingMutation = `mutation {\n${mutationParts.join('\n')}\n}`;
        batchPromises.push(
          axios.post(graphql_url, { query: enableTrackingMutation }, { headers })
            .then(resp => {
              if (resp.data.extensions && resp.data.extensions.cost && resp.data.extensions.cost.throttleStatus) {
                const throttle = resp.data.extensions.cost.throttleStatus;
                console.log(`[THROTTLE-enabletracking] After batch: max: ${throttle.maximumAvailable}, current: ${throttle.currentlyAvailable}, restoreRate: ${throttle.restoreRate}`);
                availableQueryCost = throttle.currentlyAvailable;
              }
              if (resp.data.data) {
                Object.entries(resp.data.data).forEach(([alias, mutationResult]) => {
                  if (mutationResult.userErrors && mutationResult.userErrors.length > 0) {
                    console.log(`[ERROR] Batch ${enableBatchIndex} alias ${alias} userErrors:`, mutationResult.userErrors);
                  }
                });
              }
              return { batch: enableBatchIndex, response: resp.data };
            })
            .catch(err => {
              console.log(`[ERROR] Batch ${enableBatchIndex} request error:`, err.response ? err.response.data : err);
              return { batch: enableBatchIndex, error: err.response ? err.response.data : err };
            })
        );
        enableBatchIndex++;
      }
      // Wait for all parallel batches to finish
      const results = await Promise.all(batchPromises);
      enableResults.push(...results);
      enableItems = enableItems.slice(batchesThisRound * maxBatchSize);
    }

    // Step 2: Batch inventory quantity updates in groups of 250 (parallelized)
    const MAX_BATCH_SIZE = 250;
    let allQtyBatches = [];
    for (let i = 0; i < allSetQuantities.length; i += MAX_BATCH_SIZE) {
      allQtyBatches.push(allSetQuantities.slice(i, i + MAX_BATCH_SIZE));
    }
    const inventoryQuantityStart = Date.now();
    const qtyPromises = allQtyBatches.map((batch, idx) => {
      const setQtyMutation = `
        mutation inventorySetOnHandQuantities($input: InventorySetOnHandQuantitiesInput!) {
          inventorySetOnHandQuantities(input: $input) {
            userErrors { field message }
          }
        }
      `;
      const setQtyVariables = {
        input: {
          reason: "correction",
          setQuantities: batch
        }
      };
      return axios.post(graphql_url, { query: setQtyMutation, variables: setQtyVariables }, { headers })
        .then(qtyResp => {
          if (qtyResp.data.extensions && qtyResp.data.extensions.cost && qtyResp.data.extensions.cost.throttleStatus) {
            const throttle = qtyResp.data.extensions.cost.throttleStatus;
            console.log(`[THROTTLE][QTY] After batch: max: ${throttle.maximumAvailable}, current: ${throttle.currentlyAvailable}, restoreRate: ${throttle.restoreRate}`);
          }
          if (qtyResp.data.data && qtyResp.data.data.inventorySetOnHandQuantities && qtyResp.data.data.inventorySetOnHandQuantities.userErrors && qtyResp.data.data.inventorySetOnHandQuantities.userErrors.length > 0) {
            console.log(`[ERROR][QTY] Batch ${idx} userErrors:`, qtyResp.data.data.inventorySetOnHandQuantities.userErrors);
          }
          return { batch: idx, setQuantity: qtyResp.data };
        })
        .catch(err => {
          console.log(`[ERROR][QTY] Batch ${idx} request error:`, err.response ? err.response.data : err);
          return { batch: idx, error: err.response ? err.response.data : err };
        });
    });
    const results = await Promise.all(qtyPromises);
    const inventoryQuantityEnd = Date.now();
    const inventoryQuantityElapsedSeconds = ((inventoryQuantityEnd - inventoryQuantityStart) / 1000).toFixed(2);

    const endTime = Date.now();
    const elapsedSeconds = ((endTime - startTime) / 1000).toFixed(2);
    console.log(`Inventory update completed in ${elapsedSeconds} seconds.`);
    console.log(`Inventory quantity update step completed in ${inventoryQuantityElapsedSeconds} seconds.`);
    res.json({ success: true, enableResults, results, elapsedSeconds, inventoryQuantityElapsedSeconds });
  } catch (err) {
    console.error('Error in /update-inventory:', err.response ? err.response.data : err);
    res.status(500).json({ success: false, error: err.toString(), details: err.response ? err.response.data : undefined });
  }
});

app.get('/bulk-operation-status', async (req, res) => {
  try {
    const query = `{
      currentBulkOperation {
        id
        status
        type
        createdAt
        completedAt
        errorCode
        objectCount
        rootObjectCount
        fileSize
        url
        partialDataUrl
      }
    }`;
    const resp = await axios.post(graphql_url, { query }, { headers });
    res.json(resp.data.data.currentBulkOperation || { status: 'No current bulk operation' });
  } catch (err) {
    res.status(500).json({ error: err.toString(), details: err.response ? err.response.data : undefined });
  }
});

// --- New endpoint: Enable tracking only (Step 1) ---
app.post('/enable-tracking', async (req, res) => {
  const startTime = Date.now();
  try {
    let products = [];
    let useCache = false;
    if (fs.existsSync(INVENTORY_CACHE_FILE)) {
      const stats = fs.statSync(INVENTORY_CACHE_FILE);
      const age = Date.now() - stats.mtimeMs;
      if (age < CACHE_MAX_AGE_MS) {
        products = JSON.parse(fs.readFileSync(INVENTORY_CACHE_FILE, 'utf8'));
        useCache = true;
        console.log(`[CACHE] Using cached inventory data (${products.length} products, age: ${(age/1000/60).toFixed(1)} min)`);
      }
    }
    if (!useCache) {
      let hasNextPage = true;
      let endCursor = null;
      while (hasNextPage) {
        const query = `
          {
            products(first: 100, query: "title:Dummy Product*"${endCursor ? `, after: \"${endCursor}\"` : ""}) {
              pageInfo { hasNextPage }
              edges {
                cursor
                node {
                  id
                  title
                  variants(first: 100) {
                    edges {
                      node {
                        id
                        inventoryItem { id }
                      }
                    }
                  }
                }
              }
            }
          }
        `;
        const resp = await axios.post(graphql_url, { query }, { headers });
        const data = resp.data.data.products;
        products = products.concat(data.edges.map(e => e.node));
        hasNextPage = data.pageInfo.hasNextPage;
        if (hasNextPage) {
          endCursor = data.edges[data.edges.length - 1].cursor;
        }
      }
      fs.writeFileSync(INVENTORY_CACHE_FILE, JSON.stringify(products, null, 2));
      console.log(`[CACHE] Refreshed inventory cache with ${products.length} products.`);
    }
    let allSetQuantities = products.flatMap(product =>
      product.variants.edges.map(variantEdge => ({
        inventoryItemId: variantEdge.node.inventoryItem.id
      }))
    );
    // --- Enable tracking batching logic (same as /update-inventory step 1) ---
    let enableResults = [];
    let enableBatchIndex = 0;
    let availableQueryCost = 20000;
    let stuckRetries = 0;
    const MAX_STUCK_RETRIES = 120;
    let enableItems = allSetQuantities.slice();
    const HARD_ALIAS_CAP = 100;
    while (enableItems.length > 0) {
      let maxBatchSize = Math.min(HARD_ALIAS_CAP, enableItems.length);
      let maxBatches = Math.floor(availableQueryCost / (maxBatchSize * 10));
      if (maxBatchSize === 0 || maxBatches === 0) {
        stuckRetries++;
        if (stuckRetries > MAX_STUCK_RETRIES) {
          throw new Error('Stuck waiting for query cost to restore. Aborting.');
        }
        console.log(`[WAIT] Not enough query cost. Current: ${availableQueryCost}, Needed: ${maxBatchSize * 10}. Waiting 500ms...`);
        try {
          const throttleResp = await axios.post(graphql_url, { query: '{ shop { id } }' }, { headers });
          if (throttleResp.data.extensions && throttleResp.data.extensions.cost && throttleResp.data.extensions.cost.throttleStatus) {
            const throttle = throttleResp.data.extensions.cost.throttleStatus;
            availableQueryCost = throttle.currentlyAvailable;
            console.log(`[THROTTLE-WAIT] Polled: max: ${throttle.maximumAvailable}, current: ${throttle.currentlyAvailable}, restoreRate: ${throttle.restoreRate}`);
          }
        } catch (err) {
          console.log('[THROTTLE-WAIT] Error polling throttle status:', err.response ? err.response.data : err);
        }
        await new Promise(r => setTimeout(r, 500));
        continue;
      } else {
        stuckRetries = 0;
      }
      let batchPromises = [];
      let batchesThisRound = Math.min(maxBatches, Math.ceil(enableItems.length / maxBatchSize));
      for (let b = 0; b < batchesThisRound; b++) {
        const batch = enableItems.slice(b * maxBatchSize, (b + 1) * maxBatchSize);
        let mutationParts = [];
        batch.forEach((item, idx) => {
          mutationParts.push(`t${idx}: inventoryItemUpdate(id: "${item.inventoryItemId}", input: {tracked: true}) { inventoryItem { id tracked } userErrors { message } }`);
        });
        const enableTrackingMutation = `mutation {\n${mutationParts.join('\n')}\n}`;
        batchPromises.push(
          axios.post(graphql_url, { query: enableTrackingMutation }, { headers })
            .then(resp => {
              if (resp.data.extensions && resp.data.extensions.cost && resp.data.extensions.cost.throttleStatus) {
                const throttle = resp.data.extensions.cost.throttleStatus;
                console.log(`[THROTTLE-enabletracking] After batch: max: ${throttle.maximumAvailable}, current: ${throttle.currentlyAvailable}, restoreRate: ${throttle.restoreRate}`);
                availableQueryCost = throttle.currentlyAvailable;
              }
              if (resp.data.data) {
                Object.entries(resp.data.data).forEach(([alias, mutationResult]) => {
                  if (mutationResult.userErrors && mutationResult.userErrors.length > 0) {
                    console.log(`[ERROR] Batch ${enableBatchIndex} alias ${alias} userErrors:`, mutationResult.userErrors);
                  }
                });
              }
              return { batch: enableBatchIndex, response: resp.data };
            })
            .catch(err => {
              console.log(`[ERROR] Batch ${enableBatchIndex} request error:`, err.response ? err.response.data : err);
              return { batch: enableBatchIndex, error: err.response ? err.response.data : err };
            })
        );
        enableBatchIndex++;
      }
      const results = await Promise.all(batchPromises);
      enableResults.push(...results);
      enableItems = enableItems.slice(batchesThisRound * maxBatchSize);
    }
    const endTime = Date.now();
    const elapsedSeconds = ((endTime - startTime) / 1000).toFixed(2);
    res.json({ success: true, enableResults, elapsedSeconds });
  } catch (err) {
    console.error('Error in /enable-tracking:', err.response ? err.response.data : err);
    res.status(500).json({ success: false, error: err.toString(), details: err.response ? err.response.data : undefined });
  }
});

// --- New endpoint: Update inventory quantities only (Step 2) ---
app.post('/update-inventory-quantities', async (req, res) => {
  try {
    let products = [];
    let useCache = false;
    if (fs.existsSync(INVENTORY_CACHE_FILE)) {
      const stats = fs.statSync(INVENTORY_CACHE_FILE);
      const age = Date.now() - stats.mtimeMs;
      if (age < CACHE_MAX_AGE_MS) {
        products = JSON.parse(fs.readFileSync(INVENTORY_CACHE_FILE, 'utf8'));
        useCache = true;
        console.log(`[CACHE] Using cached inventory data (${products.length} products, age: ${(age/1000/60).toFixed(1)} min)`);
      }
    }
    if (!useCache) {
      let hasNextPage = true;
      let endCursor = null;
      while (hasNextPage) {
        const query = `
          {
            products(first: 100, query: "title:Dummy Product*"${endCursor ? `, after: \"${endCursor}\"` : ""}) {
              pageInfo { hasNextPage }
              edges {
                cursor
                node {
                  id
                  title
                  variants(first: 100) {
                    edges {
                      node {
                        id
                        inventoryItem { id }
                      }
                    }
                  }
                }
              }
            }
          }
        `;
        const resp = await axios.post(graphql_url, { query }, { headers });
        const data = resp.data.data.products;
        products = products.concat(data.edges.map(e => e.node));
        hasNextPage = data.pageInfo.hasNextPage;
        if (hasNextPage) {
          endCursor = data.edges[data.edges.length - 1].cursor;
        }
      }
      fs.writeFileSync(INVENTORY_CACHE_FILE, JSON.stringify(products, null, 2));
      console.log(`[CACHE] Refreshed inventory cache with ${products.length} products.`);
    }
    // Fetch your first location ID
    const locQuery = `{
      locations(first: 1) {
        edges {
          node {
            id
            name
          }
        }
      }
    }`;
    const locResp = await axios.post(graphql_url, { query: locQuery }, { headers });
    const locationId = locResp.data.data.locations.edges[0].node.id;
    console.log(`Using locationId: ${locationId}`);
    let allSetQuantities = products.flatMap(product =>
      product.variants.edges.map(variantEdge => ({
        inventoryItemId: variantEdge.node.inventoryItem.id,
        locationId,
        quantity: Math.floor(Math.random() * 2000) + 1
      }))
    );
    // --- Inventory quantity update batching logic (same as /update-inventory step 2) ---
    const MAX_BATCH_SIZE = 250;
    let allQtyBatches = [];
    for (let i = 0; i < allSetQuantities.length; i += MAX_BATCH_SIZE) {
      allQtyBatches.push(allSetQuantities.slice(i, i + MAX_BATCH_SIZE));
    }
    const inventoryQuantityStart = Date.now();
    const qtyPromises = allQtyBatches.map((batch, idx) => {
      const setQtyMutation = `
        mutation inventorySetOnHandQuantities($input: InventorySetOnHandQuantitiesInput!) {
          inventorySetOnHandQuantities(input: $input) {
            userErrors { field message }
          }
        }
      `;
      const setQtyVariables = {
        input: {
          reason: "correction",
          setQuantities: batch
        }
      };
      return axios.post(graphql_url, { query: setQtyMutation, variables: setQtyVariables }, { headers })
        .then(qtyResp => {
          if (qtyResp.data.extensions && qtyResp.data.extensions.cost && qtyResp.data.extensions.cost.throttleStatus) {
            const throttle = qtyResp.data.extensions.cost.throttleStatus;
            console.log(`[THROTTLE][QTY] After batch: max: ${throttle.maximumAvailable}, current: ${throttle.currentlyAvailable}, restoreRate: ${throttle.restoreRate}`);
          }
          if (qtyResp.data.data && qtyResp.data.data.inventorySetOnHandQuantities && qtyResp.data.data.inventorySetOnHandQuantities.userErrors && qtyResp.data.data.inventorySetOnHandQuantities.userErrors.length > 0) {
            console.log(`[ERROR][QTY] Batch ${idx} userErrors:`, qtyResp.data.data.inventorySetOnHandQuantities.userErrors);
          }
          return { batch: idx, setQuantity: qtyResp.data };
        })
        .catch(err => {
          console.log(`[ERROR][QTY] Batch ${idx} request error:`, err.response ? err.response.data : err);
          return { batch: idx, error: err.response ? err.response.data : err };
        });
    });
    const results = await Promise.all(qtyPromises);
    const inventoryQuantityEnd = Date.now();
    const inventoryQuantityElapsedSeconds = ((inventoryQuantityEnd - inventoryQuantityStart) / 1000).toFixed(2);
    res.json({ success: true, results, inventoryQuantityElapsedSeconds, updatedCount: allSetQuantities.length });
  } catch (err) {
    console.error('Error in /update-inventory-quantities:', err.response ? err.response.data : err);
    res.status(500).json({ success: false, error: err.toString(), details: err.response ? err.response.data : undefined });
  }
});

// --- New endpoint: Update inventory from CSV ---
app.post('/update-inventory-from-csv', async (req, res) => {
  try {
    // 1. Read and parse CSV
    const csvFile = 'inventory_update.csv';
    if (!fs.existsSync(csvFile)) {
      return res.status(400).json({ success: false, error: 'CSV file not found' });
    }
    const csvContent = fs.readFileSync(csvFile, 'utf8');
    const records = csvParse.parse(csvContent, { columns: true, skip_empty_lines: true });
    // 2. Load inventory cache
    if (!fs.existsSync(INVENTORY_CACHE_FILE)) {
      return res.status(400).json({ success: false, error: 'Inventory cache not found' });
    }
    const products = JSON.parse(fs.readFileSync(INVENTORY_CACHE_FILE, 'utf8'));
    // 3. Build update list
    let updates = [];
    for (const row of records) {
      const productNumber = row.product_number || row.product || row.id || row.Product || row.productNumber;
      const quantity = parseInt(row.quantity, 10);
      if (!productNumber || isNaN(quantity)) continue;
      const title = `Dummy Product ${productNumber}`;
      const product = products.find(p => p.title === title);
      if (!product) {
        updates.push({ productNumber, status: 'not found' });
        continue;
      }
      for (const variantEdge of product.variants.edges) {
        updates.push({
          inventoryItemId: variantEdge.node.inventoryItem.id,
          productNumber,
          quantity,
          status: 'to update'
        });
      }
    }
    // 4. Get locationId
    const locQuery = `{
      locations(first: 1) {
        edges {
          node {
            id
            name
          }
        }
      }
    }`;
    const locResp = await axios.post(graphql_url, { query: locQuery }, { headers });
    const locationId = locResp.data.data.locations.edges[0].node.id;
    // 5. Prepare batches
    const MAX_BATCH_SIZE = 250;
    let allQtyBatches = [];
    let updateItems = updates.filter(u => u.status === 'to update').map(u => ({
      inventoryItemId: u.inventoryItemId,
      locationId,
      quantity: u.quantity
    }));
    for (let i = 0; i < updateItems.length; i += MAX_BATCH_SIZE) {
      allQtyBatches.push(updateItems.slice(i, i + MAX_BATCH_SIZE));
    }
    // 6. Send updates
    const qtyPromises = allQtyBatches.map((batch, idx) => {
      const setQtyMutation = `
        mutation inventorySetOnHandQuantities($input: InventorySetOnHandQuantitiesInput!) {
          inventorySetOnHandQuantities(input: $input) {
            userErrors { field message }
          }
        }
      `;
      const setQtyVariables = {
        input: {
          reason: "correction",
          setQuantities: batch
        }
      };
      return axios.post(graphql_url, { query: setQtyMutation, variables: setQtyVariables }, { headers })
        .then(qtyResp => {
          if (qtyResp.data.extensions && qtyResp.data.extensions.cost && qtyResp.data.extensions.cost.throttleStatus) {
            const throttle = qtyResp.data.extensions.cost.throttleStatus;
            console.log(`[THROTTLE][CSV] After batch: max: ${throttle.maximumAvailable}, current: ${throttle.currentlyAvailable}, restoreRate: ${throttle.restoreRate}`);
          }
          if (qtyResp.data.data && qtyResp.data.data.inventorySetOnHandQuantities && qtyResp.data.data.inventorySetOnHandQuantities.userErrors && qtyResp.data.data.inventorySetOnHandQuantities.userErrors.length > 0) {
            console.log(`[ERROR][CSV] Batch ${idx} userErrors:`, qtyResp.data.data.inventorySetOnHandQuantities.userErrors);
          }
          return { batch: idx, setQuantity: qtyResp.data };
        })
        .catch(err => {
          console.log(`[ERROR][CSV] Batch ${idx} request error:`, err.response ? err.response.data : err);
          return { batch: idx, error: err.response ? err.response.data : err };
        });
    });
    const results = await Promise.all(qtyPromises);
    const inventoryQuantityEnd = Date.now();
    const inventoryQuantityElapsedSeconds = ((inventoryQuantityEnd - inventoryQuantityStart) / 1000).toFixed(2);
    res.json({ success: true, updates, results, inventoryQuantityElapsedSeconds, updatedCount: updateItems.length });
  } catch (err) {
    console.error('Error in /update-inventory-from-csv:', err.response ? err.response.data : err);
    res.status(500).json({ success: false, error: err.toString(), details: err.response ? err.response.data : undefined });
  }
});

app.post('/set-available-quantities', async (req, res) => {
 
  try {
    // Load products from cache
    if (!fs.existsSync(INVENTORY_CACHE_FILE)) {
      return res.status(400).json({ success: false, error: 'Inventory cache not found' });
    }
    const products = JSON.parse(fs.readFileSync(INVENTORY_CACHE_FILE, 'utf8'));

    // Get locationId
    const locQuery = `{
      locations(first: 1) {
        edges { node { id name } }
      }
    }`;
    const locResp = await axios.post(graphql_url, { query: locQuery }, { headers });
    const locationId = locResp.data.data.locations.edges[0].node.id;

    // Prepare quantities array
    const quantities = products.flatMap(product =>
      product.variants.edges.map(variantEdge => ({
        inventoryItemId: variantEdge.node.inventoryItem.id,
        locationId,
        quantity: Math.floor(Math.random() * 2000) + 1
      }))
    );

    // Batch in groups of 250
    const MAX_BATCH_SIZE = 250;
    let allQtyBatches = [];
    for (let i = 0; i < quantities.length; i += MAX_BATCH_SIZE) {
      allQtyBatches.push(quantities.slice(i, i + MAX_BATCH_SIZE));
    }

    console.log(`[SET-AVAILABLE] Total items: ${quantities.length}, total batches: ${allQtyBatches.length}`);
    const startTime = Date.now();
    // --- Full parallelism with dynamic adjustment ---
    let results = [];
    let throttleWarning = false;
    let throttleError = false;
    let throttleThreshold = 2000; // If throttle points drop below this, warn and slow down
    // Helper to send a single batch
    const sendBatch = async (batch, idx) => {
      const mutation = `
        mutation inventorySetQuantities($input: InventorySetQuantitiesInput!) {
          inventorySetQuantities(input: $input) {
            inventoryAdjustmentGroup { createdAt reason }
            userErrors { field message }
          }
        }
      `;
      const variables = {
        input: {
          name: "available",
          reason: "correction",
          quantities: batch,
          ignoreCompareQuantity: true
        }
      };
      console.log(`[SET-AVAILABLE] Sending batch ${idx + 1}/${allQtyBatches.length} (${batch.length} items)`);
      try {
        const resp = await axios.post(graphql_url, { query: mutation, variables }, { headers });
        if (resp.data.extensions && resp.data.extensions.cost && resp.data.extensions.cost.throttleStatus) {
          const throttle = resp.data.extensions.cost.throttleStatus;
          console.log(`[THROTTLE][SET-AVAILABLE] After batch: max: ${throttle.maximumAvailable}, current: ${throttle.currentlyAvailable}, restoreRate: ${throttle.restoreRate}`);
          if (throttle.currentlyAvailable < throttleThreshold) {
            throttleWarning = true;
          }
        }
        if (resp.data.errors) {
          console.log(`[SET-AVAILABLE][ERROR] Batch ${idx + 1} GraphQL errors:`, resp.data.errors);
        }
        if (resp.data.data && resp.data.data.inventorySetQuantities && resp.data.data.inventorySetQuantities.userErrors && resp.data.data.inventorySetQuantities.userErrors.length > 0) {
          console.log(`[SET-AVAILABLE][USERERRORS] Batch ${idx + 1} userErrors:`, resp.data.data.inventorySetQuantities.userErrors);
        }
        return { batch: idx, response: resp.data };
      } catch (err) {
        if (err.response && err.response.data && err.response.data.errors &&
            err.response.data.errors.some(e => e.message && e.message.toLowerCase().includes('throttle'))) {
          throttleError = true;
          console.log(`[THROTTLE][SET-AVAILABLE][ERROR] Throttle error on batch ${idx + 1}`);
        } else {
          console.log(`[SET-AVAILABLE][ERROR] Batch ${idx + 1} request error:`, err.response ? err.response.data : err);
        }
        return { batch: idx, error: err.response ? err.response.data : err };
      }
    };

    // First attempt: send all in parallel
    results = await Promise.all(allQtyBatches.map((batch, idx) => sendBatch(batch, idx)));

    // If throttle warning or error, retry any failed batches with delay between them
    if (throttleWarning || throttleError) {
      console.log('[THROTTLE][SET-AVAILABLE] Throttle warning or error detected. Retrying failed batches with delay.');
      const failed = results.filter(r => r.error);
      for (const r of failed) {
        await new Promise(res => setTimeout(res, 1000)); // 1s delay
        const retryResult = await sendBatch(allQtyBatches[r.batch], r.batch);
        results[r.batch] = retryResult;
      }
    }

    const endTime = Date.now();
    const elapsedSeconds = ((endTime - startTime) / 1000).toFixed(2);
    console.log(`Set available quantities completed in ${elapsedSeconds} seconds.`);
    res.json({ success: true, updatedCount: quantities.length, results, elapsedSeconds });
  } catch (err) {
    console.error('Error in /set-available-quantities:', err.response ? err.response.data : err);
    res.status(500).json({ success: false, error: err.toString(), details: err.response ? err.response.data : undefined });
  }
});

app.post('/create-more-products', async (req, res) => {
  try {
    // 1. Determine the highest Dummy Product number
    let products = [];
    if (fs.existsSync(INVENTORY_CACHE_FILE)) {
      products = JSON.parse(fs.readFileSync(INVENTORY_CACHE_FILE, 'utf8'));
    } else {
      // Fetch all Dummy products if cache is missing
      let hasNextPage = true;
      let endCursor = null;
      while (hasNextPage) {
        const query = `{
          products(first: 100, query: "title:Dummy Product*"${endCursor ? `, after: \"${endCursor}\"` : ""}) {
            pageInfo { hasNextPage }
            edges {
              cursor
              node { title }
            }
          }
        }`;
        const resp = await axios.post(graphql_url, { query }, { headers });
        const data = resp.data.data.products;
        products = products.concat(data.edges.map(e => e.node));
        hasNextPage = data.pageInfo.hasNextPage;
        if (hasNextPage) {
          endCursor = data.edges[data.edges.length - 1].cursor;
        }
      }
    }
    // Find the highest Dummy Product number
    let maxNum = 0;
    for (const p of products) {
      const match = p.title.match(/Dummy Product (\d+)/);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num > maxNum) maxNum = num;
      }
    }
    const startNum = maxNum + 1;
    const endNum = startNum + 30000 - 1;
    // 2. Generate products.jsonl for the new range
    const lines = Array.from({ length: 30000 }, (_, i) => {
      const idx = startNum + i;
      return JSON.stringify({
        input: {
          title: `Dummy Product ${idx}`,
          descriptionHtml: `<strong>Dummy description for product ${idx}</strong>`,
          vendor: "DummyVendor",
          productType: "DummyType"
        }
      });
    });
    fs.writeFileSync('products.jsonl', lines.join('\n'));
    // 3. Get staged upload URL from Shopify
    const stagedUploadQuery = `
      mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
        stagedUploadsCreate(input: $input) {
          stagedTargets {
            url
            resourceUrl
            parameters { name value }
          }
          userErrors { field message }
        }
      }
    `;
    const variables = {
      input: [{
        resource: "BULK_MUTATION_VARIABLES",
        filename: "products.jsonl",
        mimeType: "text/jsonl",
        httpMethod: "POST"
      }]
    };
    const stagedResp = await axios.post(graphql_url, { query: stagedUploadQuery, variables }, { headers });
    const stagedTarget = stagedResp.data.data.stagedUploadsCreate.stagedTargets[0];
    const upload_url = stagedTarget.url;
    const resource_url = stagedTarget.resourceUrl;
    const params = {};
    stagedTarget.parameters.forEach(p => { params[p.name] = p.value; });
    // 4. Upload the file to the staged upload URL
    const form = new FormData();
    Object.entries(params).forEach(([key, value]) => form.append(key, value));
    form.append('file', fs.createReadStream('products.jsonl'));
    await axios.post(upload_url, form, { headers: form.getHeaders() });
    // 5. Start the bulk operation
    const key = stagedTarget.parameters.find(p => p.name === 'key').value;
    const bulkMutation = `
      mutation {
        bulkOperationRunMutation(
          mutation: """
            mutation productCreate($input: ProductInput!) {
              productCreate(input: $input) {
                product { id }
                userErrors { field message }
              }
            }
          """,
          stagedUploadPath: "${key}"
        ) {
          bulkOperation { id status }
          userErrors { field message }
        }
      }
    `;
    const bulkResp = await axios.post(graphql_url, { query: bulkMutation }, { headers });
    res.json({ success: true, result: bulkResp.data, range: { startNum, endNum } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.toString() });
  }
});

app.post('/update-prices', async (req, res) => {
  try {
    if (!fs.existsSync(INVENTORY_CACHE_FILE)) {
      return res.status(400).json({ success: false, error: 'Inventory cache not found. Please refresh cache first.' });
    }
    const products = JSON.parse(fs.readFileSync(INVENTORY_CACHE_FILE, 'utf8'));
    console.log(`[PRICE-UPDATE] Starting price update for ${products.length} products...`);
    let results = [];
    let updatedVariants = 0;
    const globalStart = Date.now();
    let productIdx = 0;
    let throttleStatus = { maximumAvailable: 20000, currentlyAvailable: 20000, restoreRate: 1000 };
    const mutationCost = 50; // Approximate cost per productVariantsBulkUpdate
    // Helper to poll throttle status
    async function pollThrottle() {
      try {
        const throttleResp = await axios.post(graphql_url, { query: '{ shop { id } }' }, { headers });
        if (throttleResp.data.extensions && throttleResp.data.extensions.cost && throttleResp.data.extensions.cost.throttleStatus) {
          throttleStatus = throttleResp.data.extensions.cost.throttleStatus;
          console.log(`[THROTTLE][PRICE-UPDATE] max: ${throttleStatus.maximumAvailable}, current: ${throttleStatus.currentlyAvailable}, restoreRate: ${throttleStatus.restoreRate}`);
        }
      } catch (err) {
        console.log('[THROTTLE][PRICE-UPDATE] Error polling throttle status:', err.response ? err.response.data : err);
      }
    }
    let prevParallel = 10;
    while (productIdx < products.length) {
      await pollThrottle();
      // Calculate max safe parallelism (use 90% of available points)
      let maxParallel = Math.floor((throttleStatus.currentlyAvailable * 0.9) / mutationCost);
      maxParallel = Math.max(1, Math.min(maxParallel, 500)); // Cap to 500 for safety
      if (maxParallel > prevParallel) {
        console.log(`[PRICE-UPDATE][SCALE-UP] Increasing parallelism to ${maxParallel}`);
      } else if (maxParallel < prevParallel) {
        console.log(`[PRICE-UPDATE][SCALE-DOWN] Decreasing parallelism to ${maxParallel}`);
      }
      prevParallel = maxParallel;
      const batch = products.slice(productIdx, productIdx + maxParallel);
      const batchStart = Date.now();
      console.log(`[PRICE-UPDATE] Starting batch at product ${productIdx + 1}/${products.length} (${batch.length} products, parallelism: ${maxParallel})`);
      const batchPromises = batch.map(async (product) => {
        if (!product.variants || !product.variants.edges || product.variants.edges.length === 0) return null;
        // Split variants into batches of 250
        const variantEdges = product.variants.edges;
        let variantResults = [];
        for (let i = 0; i < variantEdges.length; i += 250) {
          const variantBatch = variantEdges.slice(i, i + 250).map(edge => ({ id: edge.node.id, price: "100.00" }));
          const mutation = `mutation productVariantsBulkUpdate($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
            productVariantsBulkUpdate(productId: $productId, variants: $variants) {
              product { id }
              productVariants { id price }
              userErrors { field message }
            }
          }`;
          const variables = { productId: product.id, variants: variantBatch };
          try {
            const resp = await axios.post(graphql_url, { query: mutation, variables }, { headers });
            updatedVariants += variantBatch.length;
            if (resp.data.errors || (resp.data.data && resp.data.data.productVariantsBulkUpdate && resp.data.data.productVariantsBulkUpdate.userErrors && resp.data.data.productVariantsBulkUpdate.userErrors.length > 0)) {
              console.log(`[PRICE-UPDATE][ERROR] Product ${product.id}:`, resp.data.errors || resp.data.data.productVariantsBulkUpdate.userErrors);
            }
            variantResults.push({ productId: product.id, variantCount: variantBatch.length, response: resp.data });
          } catch (err) {
            console.log(`[PRICE-UPDATE][ERROR] Product ${product.id}:`, err.response ? err.response.data : err);
            variantResults.push({ productId: product.id, error: err.response ? err.response.data : err });
          }
        }
        return variantResults;
      });
      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults.flat().filter(Boolean));
      const batchEnd = Date.now();
      console.log(`[PRICE-UPDATE] Finished batch at product ${productIdx + 1}/${products.length} in ${((batchEnd - batchStart) / 1000).toFixed(2)}s`);
      productIdx += maxParallel;
      // Short delay between batches
      await new Promise(r => setTimeout(r, 50));
    }
    const globalEnd = Date.now();
    console.log(`[PRICE-UPDATE] Finished updating prices for ${products.length} products, ${updatedVariants} variants in ${((globalEnd - globalStart) / 1000).toFixed(2)}s`);
    res.json({ success: true, updatedVariants, productCount: products.length, results });
  } catch (err) {
    console.error('Error in /update-prices:', err.response ? err.response.data : err);
    res.status(500).json({ success: false, error: err.toString(), details: err.response ? err.response.data : undefined });
  }
});

app.post('/update-prices-bulk', async (req, res) => {
  try {
    if (!fs.existsSync(INVENTORY_CACHE_FILE)) {
      return res.status(400).json({ success: false, error: 'Inventory cache not found. Please refresh cache first.' });
    }
    const products = JSON.parse(fs.readFileSync(INVENTORY_CACHE_FILE, 'utf8'));
    console.log(`[BULK-PRICE-UPDATE] Starting ultra-fast bulk price update for ${products.length} products...`);
    
    // Prepare JSONL with productVariantsBulkUpdate mutations grouped by product
    let jsonlLines = [];
    for (const product of products) {
      if (product.variants && product.variants.edges && product.variants.edges.length > 0) {
        // Prepare variants for this product
        const variants = product.variants.edges.map(edge => ({
          id: edge.node.id,
          price: "100.00"
        }));
        
        // Split into batches of 250 variants per mutation (Shopify limit)
        for (let i = 0; i < variants.length; i += 250) {
          const variantBatch = variants.slice(i, i + 250);
          jsonlLines.push(JSON.stringify({
            productId: product.id,
            variants: variantBatch
          }));
        }
      }
    }
    
    console.log(`[BULK-PRICE-UPDATE] Generated ${jsonlLines.length} productVariantsBulkUpdate operations`);
    
    // Write JSONL file
    const jsonlFile = 'bulk_price_updates.jsonl';
    fs.writeFileSync(jsonlFile, jsonlLines.join('\n'));
    
    // Get staged upload URL from Shopify
    const stagedUploadQuery = `
      mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
        stagedUploadsCreate(input: $input) {
          stagedTargets {
            url
            resourceUrl
            parameters { name value }
          }
          userErrors { field message }
        }
      }
    `;
    const stagedVariables = {
      input: [{
        resource: "BULK_MUTATION_VARIABLES",
        filename: jsonlFile,
        mimeType: "text/jsonl",
        httpMethod: "POST"
      }]
    };
    
    console.log(`[BULK-PRICE-UPDATE] Requesting staged upload URL...`);
    const stagedResp = await axios.post(graphql_url, { query: stagedUploadQuery, variables: stagedVariables }, { headers });
    const stagedTarget = stagedResp.data.data.stagedUploadsCreate.stagedTargets[0];
    const upload_url = stagedTarget.url;
    const params = {};
    stagedTarget.parameters.forEach(p => { params[p.name] = p.value; });
    
    // Upload the JSONL file
    console.log(`[BULK-PRICE-UPDATE] Uploading JSONL file...`);
    const FormData = require('form-data');
    const form = new FormData();
    Object.entries(params).forEach(([key, value]) => form.append(key, value));
    form.append('file', fs.createReadStream(jsonlFile));
    await axios.post(upload_url, form, { headers: form.getHeaders() });
    
    // Start the bulk operation with the correct mutation format
    const key = stagedTarget.parameters.find(p => p.name === 'key').value;
    const bulkMutation = `
      mutation {
        bulkOperationRunMutation(
          mutation: """
            mutation productVariantsBulkUpdate($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
              productVariantsBulkUpdate(productId: $productId, variants: $variants) {
                productVariants { id price }
                userErrors { field message }
              }
            }
          """,
          stagedUploadPath: "${key}"
        ) {
          bulkOperation { id status }
          userErrors { field message }
        }
      }
    `;
    
    console.log(`[BULK-PRICE-UPDATE] Starting bulk operation...`);
    const bulkResp = await axios.post(graphql_url, { query: bulkMutation }, { headers });
    
    if (bulkResp.data.data.bulkOperationRunMutation.userErrors.length > 0) {
      console.log(`[BULK-PRICE-UPDATE] Bulk operation errors:`, bulkResp.data.data.bulkOperationRunMutation.userErrors);
      return res.status(400).json({ 
        success: false, 
        error: 'Bulk operation failed', 
        details: bulkResp.data.data.bulkOperationRunMutation.userErrors 
      });
    }
    
    const bulkOperation = bulkResp.data.data.bulkOperationRunMutation.bulkOperation;
    console.log(`[BULK-PRICE-UPDATE] Bulk operation started: ${bulkOperation.id}, status: ${bulkOperation.status}`);
    
    // Clean up the JSONL file
    fs.unlinkSync(jsonlFile);
    
    const totalVariants = products.reduce((sum, p) => sum + (p.variants?.edges?.length || 0), 0);
    res.json({ 
      success: true, 
      bulkOperationId: bulkOperation.id,
      status: bulkOperation.status,
      variantCount: totalVariants,
      operationCount: jsonlLines.length,
      message: 'Ultra-fast bulk price update started using productVariantsBulkUpdate. Use /bulk-operation-status to check progress.'
    });
    
  } catch (err) {
    console.error('Error in /update-prices-bulk:', err.response ? err.response.data : err);
    res.status(500).json({ success: false, error: err.toString(), details: err.response ? err.response.data : undefined });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
}); 