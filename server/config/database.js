// config/database.js
const { Sequelize } = require('sequelize');
const { HOST, USER, PASSWORD, DB } = require('./db.config');

const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: 'mysql',
  logging: false, // Mettez à true pour afficher les logs SQL
});

module.exports = sequelize;
