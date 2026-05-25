const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'task_tracker',
  port: process.env.DB_PORT || 3306,
  ssl: process.env.DB_HOST && process.env.DB_HOST.includes('railway') 
    ? { rejectUnauthorized: false } 
    : false,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
