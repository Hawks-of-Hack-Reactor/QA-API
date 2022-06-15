const Sequelize = require('sequelize');
const axios = require('axios');
const Promise = require('bluebird');

// const connection = new Sequelize('postgres://52.91.243.247:5432/postgres');

const connection = new Sequelize('postgres', 'postgres', '5555', {
  host: '52.91.243.247',
  dialect: 'postgres',
  logging: false,
});

connection.authenticate()
  .then(() => console.log('Connected to PostgreSQL db!'))
  .catch((err) => console.log('Unable to connect to  PostgreSQL db: ', err));

module.exports = connection;