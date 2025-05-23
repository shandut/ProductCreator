const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

// Product creation
router.post('/create', productController.createProducts);
router.post('/create-more', productController.createMoreProducts);

// Bulk operations status
router.get('/bulk-operation-status', productController.getBulkOperationStatus);

module.exports = router; 