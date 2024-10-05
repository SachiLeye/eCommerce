const express = require('express');
const router = express.Router();
const cartController = require('../controller/cartController');

// Route to get the current cart
router.get('/', cartController.getCart);

// Route to add an item to the cart
router.post('/add', cartController.addToCart);


// Route to update the quantity of an item in the cart
router.post('/update', cartController.updateCartItem);

// Route to remove an item from the cart
router.post('/remove', cartController.removeFromCart);

module.exports = router;
