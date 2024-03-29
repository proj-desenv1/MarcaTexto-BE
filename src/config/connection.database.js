const dotenv = require('dotenv');
dotenv.config();

const { Pool } = require("pg");

module.exports = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME
});