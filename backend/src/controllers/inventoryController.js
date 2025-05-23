const inventoryService = require('../services/inventoryService');
const shopifyService = require('../services/shopifyService');
const cache = require('../utils/cache');
const logger = require('../utils/logger');

class InventoryController {
  /**
   * Refresh inventory cache
   */
  async refreshCache(req, res) {
    try {
      logger.info('Cache refresh requested');
      const products = await shopifyService.fetchAllProducts();
      const count = cache.save(products);
      
      res.json({ 
        success: true, 
        count,
        message: `Cache refreshed with ${count} products`
      });
    } catch (error) {
      logger.error('Cache refresh failed', error);
      res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  }

  /**
   * Enable tracking for all inventory items
   */
  async enableTracking(req, res) {
    try {
      logger.info('Enable tracking requested');
      
      if (!cache.exists()) {
        return res.status(400).json({ 
          success: false, 
          error: 'Inventory cache not found. Please refresh cache first.' 
        });
      }

      const products = cache.load();
      const result = await inventoryService.enableTracking(products);
      
      res.json({ 
        success: true, 
        ...result,
        totalItems: products.reduce((sum, p) => sum + (p.variants?.edges?.length || 0), 0)
      });
    } catch (error) {
      logger.error('Enable tracking failed', error);
      res.status(500).json({ 
        success: false, 
        error: error.message,
        details: error.response?.data 
      });
    }
  }

  /**
   * Update inventory quantities only
   */
  async updateQuantities(req, res) {
    try {
      logger.info('Update quantities requested');
      
      if (!cache.exists()) {
        return res.status(400).json({ 
          success: false, 
          error: 'Inventory cache not found. Please refresh cache first.' 
        });
      }

      const products = cache.load();
      const locationId = await shopifyService.getFirstLocationId();
      const result = await inventoryService.updateOnHandQuantities(products, locationId);
      
      res.json({ 
        success: true, 
        ...result
      });
    } catch (error) {
      logger.error('Update quantities failed', error);
      res.status(500).json({ 
        success: false, 
        error: error.message,
        details: error.response?.data 
      });
    }
  }

  /**
   * Set available quantities
   */
  async setAvailableQuantities(req, res) {
    try {
      logger.info('Set available quantities requested');
      
      if (!cache.exists()) {
        return res.status(400).json({ 
          success: false, 
          error: 'Inventory cache not found. Please refresh cache first.' 
        });
      }

      const products = cache.load();
      const locationId = await shopifyService.getFirstLocationId();
      const result = await inventoryService.setAvailableQuantities(products, locationId);
      
      res.json({ 
        success: true, 
        ...result
      });
    } catch (error) {
      logger.error('Set available quantities failed', error);
      res.status(500).json({ 
        success: false, 
        error: error.message,
        details: error.response?.data 
      });
    }
  }

  /**
   * Full inventory update (enable tracking + update quantities)
   */
  async fullUpdate(req, res) {
    try {
      logger.info('Full inventory update requested');
      
      const result = await inventoryService.fullInventoryUpdate();
      
      res.json({ 
        success: true, 
        ...result,
        message: 'Full inventory update completed'
      });
    } catch (error) {
      logger.error('Full inventory update failed', error);
      res.status(500).json({ 
        success: false, 
        error: error.message,
        details: error.response?.data 
      });
    }
  }

  /**
   * Update inventory from CSV file
   */
  async updateFromCSV(req, res) {
    try {
      const fs = require('fs');
      const csvParse = require('csv-parse/sync');
      
      logger.info('CSV inventory update requested');
      
      // Read CSV file
      const csvFile = 'inventory_update.csv';
      if (!fs.existsSync(csvFile)) {
        return res.status(400).json({ 
          success: false, 
          error: 'CSV file not found' 
        });
      }

      if (!cache.exists()) {
        return res.status(400).json({ 
          success: false, 
          error: 'Inventory cache not found. Please refresh cache first.' 
        });
      }

      const csvContent = fs.readFileSync(csvFile, 'utf8');
      const records = csvParse.parse(csvContent, { 
        columns: true, 
        skip_empty_lines: true 
      });

      logger.info(`Processing CSV with ${records.length} records`);

      const products = cache.load();
      const locationId = await shopifyService.getFirstLocationId();

      // Build update list
      let updates = [];
      let foundProducts = 0;
      let notFoundProducts = 0;
      
      for (const row of records) {
        const productId = row.product_number || row.product || row.id || row.Product || row.productNumber;
        const quantity = parseInt(row.quantity, 10);
        
        if (!productId || isNaN(quantity)) {
          logger.warn(`Skipping invalid row: productId=${productId}, quantity=${quantity}`);
          continue;
        }
        
        // Find product by Shopify Product ID (with or without gid prefix)
        const shopifyProductGid = productId.startsWith('gid://shopify/Product/') 
          ? productId 
          : `gid://shopify/Product/${productId}`;
        
        const product = products.find(p => p.id === shopifyProductGid);
        
        if (!product) {
          logger.warn(`Product not found: ${productId}`);
          updates.push({ 
            productId, 
            status: 'not found',
            message: `Product ID ${productId} not found in cache`
          });
          notFoundProducts++;
          continue;
        }

        logger.info(`Found product: ${product.title} (${productId}) with ${product.variants.edges.length} variants`);
        foundProducts++;

        // Get all inventory items for this product's variants
        for (const variantEdge of product.variants.edges) {
          updates.push({
            inventoryItemId: variantEdge.node.inventoryItem.id,
            productId,
            productTitle: product.title,
            quantity,
            locationId,
            status: 'to update'
          });
        }
      }

      logger.info(`CSV processing summary: ${foundProducts} found, ${notFoundProducts} not found`);

      // Update quantities
      const updateItems = updates.filter(u => u.status === 'to update');
      logger.info(`Preparing to update ${updateItems.length} inventory items`);
      
      // Filter to only include fields that Shopify expects for InventorySetQuantityInput
      const shopifyUpdateItems = updateItems.map(item => ({
        inventoryItemId: item.inventoryItemId,
        locationId: item.locationId,
        quantity: item.quantity
      }));
      
      logger.info('Shopify mutation payload preview:', shopifyUpdateItems.slice(0, 2));
      
      const batches = inventoryService.createBatches(shopifyUpdateItems);
      logger.info(`Split into ${batches.length} batches`);
      
      const results = await Promise.all(
        batches.map((batch, idx) => {
          logger.batch('CSV_UPDATE', idx, batches.length, batch.length);
          
          const mutation = `
            mutation inventorySetOnHandQuantities($input: InventorySetOnHandQuantitiesInput!) {
              inventorySetOnHandQuantities(input: $input) {
                userErrors { field message }
              }
            }
          `;
          
          const variables = {
            input: {
              reason: "correction",
              setQuantities: batch
            }
          };

          return shopifyService.graphql(mutation, variables)
            .then(response => {
              if (response.data?.inventorySetOnHandQuantities?.userErrors?.length > 0) {
                logger.error(`CSV Update Batch ${idx} userErrors`, response.data.inventorySetOnHandQuantities.userErrors);
              } else {
                logger.info(`CSV Update Batch ${idx} completed successfully`);
              }
              return { batch: idx, response };
            })
            .catch(error => {
              logger.error(`CSV Update Batch ${idx} request error`, error.response?.data || error);
              return { batch: idx, error };
            });
        })
      );
      
      const successfulUpdates = results.filter(r => !r.error && !r.response?.errors?.length).length;
      logger.info(`CSV Update completed: ${successfulUpdates}/${batches.length} batches successful`);
      
      res.json({ 
        success: true, 
        updates, // Include all update info for debugging
        results, 
        updatedCount: updateItems.length,
        summary: {
          totalRecords: records.length,
          productsFound: foundProducts,
          productsNotFound: notFoundProducts,
          inventoryItemsToUpdate: updateItems.length,
          batchesProcessed: batches.length,
          successfulBatches: successfulUpdates
        }
      });
    } catch (error) {
      logger.error('CSV inventory update failed', error);
      res.status(500).json({ 
        success: false, 
        error: error.message,
        details: error.response?.data 
      });
    }
  }
}

module.exports = new InventoryController(); 