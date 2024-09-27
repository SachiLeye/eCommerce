const db = require('../config/db');

class Order {
  static create(userId, totalAmount) {
    return db.execute(
      'INSERT INTO orders (user_id, total_amount) VALUES (?, ?)',
      [userId, totalAmount]
    );
  }

  static findByUserId(userId) {
    return db.execute('SELECT * FROM orders WHERE user_id = ?', [userId]);
  }
}

module.exports = Order;