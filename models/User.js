const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
  static findById(id) {
    return db.execute('SELECT * FROM users WHERE id = ?', [id]);
  }

  static findByEmail(email) {
    return db.execute('SELECT * FROM users WHERE email = ?', [email]);
  }

  // Create user with default role as 'user'
  static create(nickName, firstName, middleName, lastName, gender, email, password, role = 'user') {
    return db.execute(
        'INSERT INTO users (nickname, firstname, middlename, lastname, gender, email, password, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [nickName, firstName, middleName, lastName, gender, email, password, role]
    );
  }
}

module.exports = User;
