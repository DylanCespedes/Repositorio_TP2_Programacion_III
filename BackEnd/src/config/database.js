const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host : "localhost",
  database:"comprapc",
  user : "root",
  password: 'Rojodiablo5555',
  port: 3305,
  waitForConnections: true, 
  connectionLimit: 10,      
  queueLimit: 0            
});

module.exports = db;
