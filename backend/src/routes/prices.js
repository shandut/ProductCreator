const express = require('express');
const priceController = require('../controllers/priceController');

const router = express.Router();

// Price updates
router.post('/update', priceController.updatePrices);
router.post('/update-bulk', priceController.updatePricesBulk);

module.exports = router; 