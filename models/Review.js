const db = require('../config/db');

class Review {
  static async create(userId, productId, rating, comment) {
    const [result] = await db.execute(
      'INSERT INTO reviews (user_id, product_id, rating, comment) VALUES (?, ?, ?, ?)',
      [userId, productId, rating, comment]
    );
    return result.insertId;
  }

  static async findByProductId(productId) {
    const [rows] = await db.execute('SELECT * FROM reviews WHERE product_id = ?', [productId]);
    return rows;
  }

  static async findByUserId(userId) {
    const [rows] = await db.execute('SELECT * FROM reviews WHERE user_id = ?', [userId]);
    return rows;
  }

  static async update(id, rating, comment) {
    const [result] = await db.execute(
      'UPDATE reviews SET rating = ?, comment = ? WHERE id = ?',
      [rating, comment, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await db.execute('DELETE FROM reviews WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Review;