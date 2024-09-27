const db = require('../config/db');

class OrderItem {
  static bulkCreate(orderItems) {
    const sql = 'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?';
    return db.query(sql, [orderItems]);
  }
}

module.exports = OrderItem;