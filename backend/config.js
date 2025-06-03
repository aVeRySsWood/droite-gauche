require('dotenv').config();

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'mysql',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'votes_db'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('✅ Connecté à MySQL');
});

module.exports = connection;
