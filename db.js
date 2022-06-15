require('dotenv').config();
const Sequelize = require('sequelize');
const axios = require('axios');
const Promise = require('bluebird');

// const connection = new Sequelize('postgres://localhost:5432/postgres');

const connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false,
});

connection.authenticate()
  .then(() => console.log('Connected to PostgreSQL db!'))
  .catch((err) => console.log('Unable to connect to  PostgreSQL db: ', err));

module.exports = connection;