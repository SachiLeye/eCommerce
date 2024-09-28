const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'ansel',
  password: 'ansel',
  database: 'ecommerce',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


module.exports = pool.promise();