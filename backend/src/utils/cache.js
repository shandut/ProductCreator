const fs = require('fs');
const config = require('../config/shopify');
const logger = require('./logger');

class CacheManager {
  constructor() {
    this.cacheFile = config.cache.inventoryCacheFile;
    this.maxAge = config.cache.maxAgeMs;
  }

  /**
   * Check if cache exists and is not expired
   */
  isValid() {
    if (!fs.existsSync(this.cacheFile)) {
      return false;
    }
    
    const stats = fs.statSync(this.cacheFile);
    const age = Date.now() - stats.mtimeMs;
    return age < this.maxAge;
  }

  /**
   * Get cache age in minutes
   */
  getAge() {
    if (!fs.existsSync(this.cacheFile)) {
      return null;
    }
    
    const stats = fs.statSync(this.cacheFile);
    const ageMs = Date.now() - stats.mtimeMs;
    return (ageMs / 1000 / 60).toFixed(1);
  }

  /**
   * Load products from cache
   */
  load() {
    try {
      if (!fs.existsSync(this.cacheFile)) {
        throw new Error('Cache file not found');
      }
      
      const products = JSON.parse(fs.readFileSync(this.cacheFile, 'utf8'));
      const age = this.getAge();
      logger.info(`Cache loaded: ${products.length} products (age: ${age} min)`);
      return products;
    } catch (error) {
      logger.error('Error loading cache', error);
      throw error;
    }
  }

  /**
   * Save products to cache
   */
  save(products) {
    try {
      fs.writeFileSync(this.cacheFile, JSON.stringify(products, null, 2));
      logger.info(`Cache saved: ${products.length} products`);
      return products.length;
    } catch (error) {
      logger.error('Error saving cache', error);
      throw error;
    }
  }

  /**
   * Check if cache exists
   */
  exists() {
    return fs.existsSync(this.cacheFile);
  }

  /**
   * Clear cache
   */
  clear() {
    try {
      if (fs.existsSync(this.cacheFile)) {
        fs.unlinkSync(this.cacheFile);
        logger.info('Cache cleared');
      }
    } catch (error) {
      logger.error('Error clearing cache', error);
      throw error;
    }
  }
}

module.exports = new CacheManager(); 