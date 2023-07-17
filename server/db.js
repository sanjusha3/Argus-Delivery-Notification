const { Pool} = require('pg');

// Configure the connection
const config = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: 'localhost',
  port: 5432, // Default PostgreSQL port
  database: process.env.DB_NAME
};

// Create a new client instance
const pool = new Pool(config);

// Connect to the PostgreSQL database
pool.connect((err) => {
  if (err) {
    console.error('Connection error', err.stack);
  } else {
    console.log('Connected to the database');
    // Execute a query
    // executeQuery();
  }
});

const Sequelize = require('sequelize');

// Create a new Sequelize instance
const sequelize = new Sequelize('maindb', 'root', 'root', {
  host: 'localhost',
  dialect: 'postgres',
});


module.exports={pool,sequelize};