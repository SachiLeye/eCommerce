const db = require('../config/db');

class Cart {
  static async addItem(userId, productId, quantity) {
    const [result] = await db.execute(
      'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)',
      [userId, productId, quantity]
    );
    return result.affectedRows > 0;
  }

  static async updateItem(userId, productId, quantity) {
    const [result] = await db.execute(
      'UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?',
      [quantity, userId, productId]
    );
    return result.affectedRows > 0;
  }

  static async removeItem(userId, productId) {
    const [result] = await db.execute(
      'DELETE FROM cart WHERE user_id = ? AND product_id = ?',
      [userId, productId]
    );
    return result.affectedRows > 0;
  }

  static async getCart(userId) {
    const [rows] = await db.execute(
      'SELECT c.*, p.name, p.price, p.image_url FROM cart c JOIN products p ON c.product_id = p.id WHERE c.user_id = ?',
      [userId]
    );
    return rows;
  }

  static async clearCart(userId) {
    const [result] = await db.execute('DELETE FROM cart WHERE user_id = ?', [userId]);
    return result.affectedRows > 0;
  }
}

module.exports = Cart;