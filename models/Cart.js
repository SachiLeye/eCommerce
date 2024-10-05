const pool = require('../config/db');

const Cart = {
  // Add to Cart
  addToCart: async (userId, productId, quantity) => {
    try {
      const [rows] = await pool.query(
        'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + ?',
        [userId, productId, quantity, quantity]
      );
      return rows;
    } catch (err) {
      console.error('Error adding to cart:', err);
      throw err;
    }
  },

  // Retrieve Cart Items by User ID
  getCartByUserId: async (userId) => {
    try {
      const [rows] = await pool.query(
        `SELECT cart.product_id, cart.quantity, products.name, products.price, products.image_url 
        FROM cart 
        JOIN products ON cart.product_id = products.id 
        WHERE cart.user_id = ?`,
        [userId]
      );
      return rows;
    } catch (err) {
      console.error('Error retrieving cart:', err);
      throw err;
    }
  },

  // Update Cart Item (change quantity)
  updateCartItem: async (userId, productId, quantity) => {
    try {
      const [rows] = await pool.query(
        'UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?',
        [quantity, userId, productId]
      );
      return rows;
    } catch (err) {
      console.error('Error updating cart item:', err);
      throw err;
    }
  },

  // Delete Cart Item
  removeCartItem: async (userId, productId) => {
    try {
      const [rows] = await pool.query(
        'DELETE FROM cart WHERE user_id = ? AND product_id = ?',
        [userId, productId]
      );
      return rows;
    } catch (err) {
      console.error('Error removing cart item:', err);
      throw err;
    }
  },

  // Clear Cart (optional, can be called on user logout or order completion)
  clearCart: async (userId) => {
    try {
      const [rows] = await pool.query(
        'DELETE FROM cart WHERE user_id = ?',
        [userId]
      );
      return rows;
    } catch (err) {
      console.error('Error clearing cart:', err);
      throw err;
    }
  }
};

module.exports = Cart;
