const pool = require('../config/db');

const Product = {
  
  getProductsByCategory: async (category) => {
    try {
      const [rows] = await pool.query('SELECT * FROM products WHERE category = ?', [category]);
      return rows;
    } catch (err) {
      console.error('Error retrieving products:', err);
      throw err;
    }
  },

  addProduct: async (product) => {
    try {
      const { name, description, price, stock, category, image_url } = product;
      const [result] = await pool.query(
        'INSERT INTO products (name, description, price, stock, category, image_url) VALUES (?, ?, ?, ?, ?, ?)',
        [name, description, price, stock, category, image_url]
      );
      return result;
    } catch (err) {
      console.error('Error inserting product:', err);
      throw err;
    }
  }
};


module.exports = Product;
