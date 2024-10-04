const express = require('express');
const router = express.Router();
const cartController = require('../controller/cartController');

router.get('/', cartController.getCart);
router.post('/add', cartController.addToCart);
router.post('/update', cartController.updateCartItem);
router.post('/remove', cartController.removeFromCart);

module.exports = router;