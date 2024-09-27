const db = require('../config/db');

class Product {
  static findAll() {
    return db.execute('SELECT * FROM products');
  }

  static findById(id) {
    return db.execute('SELECT * FROM products WHERE id = ?', [id]);
  }

  static create(name, description, price, stock, imageUrl) {
    return db.execute(
      'INSERT INTO products (name, description, price, stock, image_url) VALUES (?, ?, ?, ?, ?)',
      [name, description, price, stock, imageUrl]
    );
  }
}

module.exports = Product;