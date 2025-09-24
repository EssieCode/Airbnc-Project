const { Pool } = require("pg");

//This will creat ethe connection for the right database
require("dotenv").config()

const pool = new Pool();

module.exports = pool;