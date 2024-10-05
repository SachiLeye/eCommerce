const Product = require('../models/Product'); // Adjust the path if needed
const pool = require('../config/db'); // Import your database configuration


exports.getCart = (req, res) => {
    const cart = req.session.cart || { items: [], totalQty: 0, totalPrice: 0 };
    res.render('cart', { cart: cart });
  };
  
  // Assuming you're using Mongoose or a similar ORM

  exports.addToCart = async (req, res) => {
    const productId = req.body.productId;
  
    try {
      const product = await Product.getProductById(productId);
  
      if (!product) {
        return res.status(404).send('Product not found');
      }
  
      // Get the cart from the session or initialize a new one
      const cart = req.session.cart ? req.session.cart : { items: [], totalPrice: 0 };
  
      // Check if the product is already in the cart
      const existingProductIndex = cart.items.findIndex(item => item.id == productId);
  
      if (existingProductIndex > -1) {
        // Product already in cart, increase quantity
        cart.items[existingProductIndex].quantity += 1;
      } else {
        // Add new product to cart
        cart.items.push({
          id: product.id,
          name: product.name,
          price: parseFloat(product.price),  // Ensure price is a number
          quantity: 1
        });
      }
  
      // Update the total price
      cart.totalPrice = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  
      // Save the updated cart to the session
      req.session.cart = cart;
  
      res.redirect('/cart');
    } catch (err) {
      console.error('Error adding product to cart:', err);
      res.status(500).send('Server Error');
    }
  };
  

  
  
  exports.updateCartItem = (req, res) => {
    const productId = req.body.productId;
    const quantity = parseInt(req.body.quantity);
  
    let cart = req.session.cart;
  
    if (!cart) {
      return res.status(400).json({ error: 'Cart not found' });
    }
  
    const cartItem = cart.items.find(item => item.id === productId);
  
    if (!cartItem) {
      return res.status(404).json({ error: 'Product not found in cart' });
    }
  
    cart.totalQty += quantity - cartItem.quantity;
    cart.totalPrice += cartItem.price * (quantity - cartItem.quantity);
    cartItem.quantity = quantity;
  
    req.session.cart = cart;
    res.redirect('/cart');
  };
  
  exports.removeFromCart = (req, res) => {
    const productId = req.body.productId;
  
    let cart = req.session.cart;
  
    if (!cart) {
      return res.status(400).json({ error: 'Cart not found' });
    }
  
    const itemIndex = cart.items.findIndex(item => item.id === productId);
  
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Product not found in cart' });
    }
  
    const item = cart.items[itemIndex];
    cart.totalQty -= item.quantity;
    cart.totalPrice -= item.price * item.quantity;
    cart.items.splice(itemIndex, 1);
  
    req.session.cart = cart;
    res.redirect('/cart');
  };