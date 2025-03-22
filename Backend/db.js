const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_host,
  user: process.env.DB_user,
  password: process.env.DB_password,
  database : process.env.DB_name,
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = { db }