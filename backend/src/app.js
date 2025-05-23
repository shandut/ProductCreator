const express = require('express');
const cors = require('cors');
const config = require('./config/shopify');
const logger = require('./utils/logger');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

// Import routes
const inventoryRoutes = require('./routes/inventory');
const productRoutes = require('./routes/products');
const priceRoutes = require('./routes/prices');

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`, { 
    query: req.query, 
    body: req.method !== 'GET' ? req.body : undefined 
  });
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API routes
app.use('/inventory', inventoryRoutes);
app.use('/products', productRoutes);
app.use('/prices', priceRoutes);

// Legacy route mappings for backward compatibility
app.use('/refresh-inventory-cache', inventoryRoutes);
app.use('/update-inventory', inventoryRoutes);
app.use('/enable-tracking', inventoryRoutes);
app.use('/update-inventory-quantities', inventoryRoutes);
app.use('/update-inventory-from-csv', inventoryRoutes);
app.use('/set-available-quantities', inventoryRoutes);
app.use('/create-products', productRoutes);
app.use('/create-more-products', productRoutes);
app.use('/bulk-operation-status', productRoutes);
app.use('/update-prices', priceRoutes);
app.use('/update-prices-bulk', priceRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app; 