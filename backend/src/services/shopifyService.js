const axios = require('axios');
const config = require('../config/shopify');
const logger = require('../utils/logger');

class ShopifyService {
  constructor() {
    this.graphqlUrl = config.shopify.graphqlUrl;
    this.headers = config.shopify.headers;
  }

  /**
   * Make a GraphQL request to Shopify
   */
  async graphql(query, variables = null) {
    try {
      const payload = { query };
      if (variables) {
        payload.variables = variables;
      }

      const response = await axios.post(this.graphqlUrl, payload, { headers: this.headers });
      
      // Log throttle status if available
      if (response.data.extensions?.cost?.throttleStatus) {
        const throttle = response.data.extensions.cost.throttleStatus;
        logger.throttle('GRAPHQL', throttle);
      }

      return response.data;
    } catch (error) {
      logger.error('GraphQL request failed', error.response?.data || error);
      throw error;
    }
  }

  /**
   * Get current throttle status
   */
  async getThrottleStatus() {
    try {
      const response = await this.graphql('{ shop { id } }');
      return response.extensions?.cost?.throttleStatus || null;
    } catch (error) {
      logger.error('Failed to get throttle status', error);
      return null;
    }
  }

  /**
   * Get first location ID
   */
  async getFirstLocationId() {
    const query = `{
      locations(first: 1) {
        edges {
          node {
            id
            name
          }
        }
      }
    }`;

    const response = await this.graphql(query);
    if (!response.data?.locations?.edges?.length) {
      throw new Error('No locations found');
    }

    const location = response.data.locations.edges[0].node;
    logger.info(`Using location: ${location.name} (${location.id})`);
    return location.id;
  }

  /**
   * Fetch all products matching a query with pagination
   */
  async fetchAllProducts(searchQuery = "title:Dummy Product*") {
    let products = [];
    let hasNextPage = true;
    let endCursor = null;

    while (hasNextPage) {
      const query = `{
        products(first: 100, query: "${searchQuery}"${endCursor ? `, after: "${endCursor}"` : ""}) {
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

      const response = await this.graphql(query);
      const data = response.data.products;
      
      products = products.concat(data.edges.map(e => e.node));
      hasNextPage = data.pageInfo.hasNextPage;
      
      if (hasNextPage) {
        endCursor = data.edges[data.edges.length - 1].cursor;
      }
    }

    logger.info(`Fetched ${products.length} products from Shopify`);
    return products;
  }

  /**
   * Get current bulk operation status
   */
  async getBulkOperationStatus() {
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

    const response = await this.graphql(query);
    return response.data.currentBulkOperation;
  }

  /**
   * Create staged upload for bulk operations
   */
  async createStagedUpload(filename, mimeType = "text/jsonl") {
    const mutation = `
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
        filename,
        mimeType,
        httpMethod: "POST"
      }]
    };

    const response = await this.graphql(mutation, variables);
    
    if (response.data.stagedUploadsCreate.userErrors?.length > 0) {
      throw new Error(`Staged upload error: ${JSON.stringify(response.data.stagedUploadsCreate.userErrors)}`);
    }

    return response.data.stagedUploadsCreate.stagedTargets[0];
  }

  /**
   * Start a bulk operation
   */
  async startBulkOperation(mutation, stagedUploadPath) {
    const bulkMutation = `
      mutation {
        bulkOperationRunMutation(
          mutation: """${mutation}""",
          stagedUploadPath: "${stagedUploadPath}"
        ) {
          bulkOperation { id status }
          userErrors { field message }
        }
      }
    `;

    const response = await this.graphql(bulkMutation);
    
    if (response.data.bulkOperationRunMutation.userErrors?.length > 0) {
      throw new Error(`Bulk operation error: ${JSON.stringify(response.data.bulkOperationRunMutation.userErrors)}`);
    }

    return response.data.bulkOperationRunMutation.bulkOperation;
  }
}

module.exports = new ShopifyService(); 