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
  },
  deleteProduct: async (id) => {
    try {
      const [result] = await pool.query('DELETE FROM products WHERE id = ?', [id]);
      return result;
    } catch (err) {
      console.error('Error deleting product:', err);
      throw err;
    }
  },
  getProductById: async (id) => {
    try {
        const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
        return rows[0]; // Return the first product found
    } catch (err) {
        console.error('Error retrieving product:', err);
        throw err;
    }
},

// Update a product
updateProduct: async (product) => {
    try {
        const { id, name, description, price, stock, category, image_url } = product;
        await pool.query(
            'UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category = ?, image_url = ? WHERE id = ?',
            [name, description, price, stock, category, image_url, id]
        );
    } catch (err) {
        console.error('Error updating product:', err);
        throw err;
    }
}
};


module.exports = Product;
