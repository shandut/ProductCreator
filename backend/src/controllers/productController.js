const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const shopifyService = require('../services/shopifyService');
const cache = require('../utils/cache');
const logger = require('../utils/logger');

class ProductController {
  /**
   * Create 30,000 dummy products using bulk operations
   */
  async createProducts(req, res) {
    try {
      logger.info('Product creation requested');
      
      // Generate products.jsonl
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
      logger.info('Generated products.jsonl with 30,000 products');

      // Create staged upload
      const stagedTarget = await shopifyService.createStagedUpload('products.jsonl');
      const upload_url = stagedTarget.url;
      const params = {};
      stagedTarget.parameters.forEach(p => { params[p.name] = p.value; });

      // Upload file
      logger.info('Uploading products.jsonl to Shopify');
      const form = new FormData();
      Object.entries(params).forEach(([key, value]) => form.append(key, value));
      form.append('file', fs.createReadStream('products.jsonl'));
      await axios.post(upload_url, form, { headers: form.getHeaders() });

      // Start bulk operation
      const key = stagedTarget.parameters.find(p => p.name === 'key').value;
      const productCreateMutation = `
        mutation productCreate($input: ProductInput!) {
          productCreate(input: $input) {
            product { id }
            userErrors { field message }
          }
        }
      `;

      const bulkOperation = await shopifyService.startBulkOperation(productCreateMutation, key);
      
      logger.info(`Bulk product creation started: ${bulkOperation.id}`);
      
      res.json({ 
        success: true, 
        result: bulkOperation,
        message: `Bulk operation started for 30,000 products! ID: ${bulkOperation.id}`
      });
    } catch (error) {
      logger.error('Product creation failed', error);
      res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  }

  /**
   * Create more products starting from the highest existing number
   */
  async createMoreProducts(req, res) {
    try {
      logger.info('Create more products requested');
      
      // Determine highest Dummy Product number
      let products = [];
      if (cache.exists()) {
        products = cache.load();
      } else {
        products = await shopifyService.fetchAllProducts();
      }

      // Find highest number
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
      
      logger.info(`Creating products from ${startNum} to ${endNum}`);

      // Generate new products.jsonl
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

      // Create and upload
      const stagedTarget = await shopifyService.createStagedUpload('products.jsonl');
      const upload_url = stagedTarget.url;
      const params = {};
      stagedTarget.parameters.forEach(p => { params[p.name] = p.value; });

      const form = new FormData();
      Object.entries(params).forEach(([key, value]) => form.append(key, value));
      form.append('file', fs.createReadStream('products.jsonl'));
      await axios.post(upload_url, form, { headers: form.getHeaders() });

      // Start bulk operation
      const key = stagedTarget.parameters.find(p => p.name === 'key').value;
      const productCreateMutation = `
        mutation productCreate($input: ProductInput!) {
          productCreate(input: $input) {
            product { id }
            userErrors { field message }
          }
        }
      `;

      const bulkOperation = await shopifyService.startBulkOperation(productCreateMutation, key);
      
      res.json({ 
        success: true, 
        result: bulkOperation, 
        range: { startNum, endNum },
        message: `Bulk operation started for Dummy Product ${startNum} to ${endNum}!`
      });
    } catch (error) {
      logger.error('Create more products failed', error);
      res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  }

  /**
   * Get bulk operation status
   */
  async getBulkOperationStatus(req, res) {
    try {
      const status = await shopifyService.getBulkOperationStatus();
      res.json(status || { status: 'No current bulk operation' });
    } catch (error) {
      logger.error('Get bulk operation status failed', error);
      res.status(500).json({ 
        error: error.message,
        details: error.response?.data 
      });
    }
  }
}

module.exports = new ProductController(); 