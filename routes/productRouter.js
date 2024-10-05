// routes/productRouter.js

const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');

// Define routes for product categories
router.get('/category/kids', productController.getKidsCategory);
router.get('/category/teens', productController.getTeensCategory);
router.get('/category/adults', productController.getAdultsCategory);
router.get('/category/trends', productController.getTrendsCategory);
router.get('/category/customize', productController.getCustomizeCategory);

module.exports = router;
