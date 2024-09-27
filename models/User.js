const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
  static findById(id) {
    return db.execute('SELECT * FROM users WHERE id = ?', [id]);
  }

  static findByEmail(email) {
    return db.execute('SELECT * FROM users WHERE email = ?', [email]);
  }

  static create(name, email, password) {
    return db.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );
  }
}

module.exports = User;