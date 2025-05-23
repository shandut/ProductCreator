const logger = {
  info: (message, data = null) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] INFO: ${message}`, data ? JSON.stringify(data, null, 2) : '');
  },

  error: (message, error = null) => {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] ERROR: ${message}`, error || '');
  },

  warn: (message, data = null) => {
    const timestamp = new Date().toISOString();
    console.warn(`[${timestamp}] WARN: ${message}`, data ? JSON.stringify(data, null, 2) : '');
  },

  debug: (message, data = null) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] DEBUG: ${message}`, data ? JSON.stringify(data, null, 2) : '');
  },

  // Specialized loggers for different operations
  throttle: (operation, throttleStatus) => {
    console.log(`[THROTTLE][${operation}] max: ${throttleStatus.maximumAvailable}, current: ${throttleStatus.currentlyAvailable}, restoreRate: ${throttleStatus.restoreRate}`);
  },

  batch: (operation, batchIndex, totalBatches, batchSize = null) => {
    const sizeInfo = batchSize ? ` (${batchSize} items)` : '';
    console.log(`[${operation}] Batch ${batchIndex + 1}/${totalBatches}${sizeInfo}`);
  },

  timing: (operation, elapsedSeconds, additionalInfo = '') => {
    console.log(`[TIMING][${operation}] Completed in ${elapsedSeconds}s ${additionalInfo}`);
  }
};

module.exports = logger; 