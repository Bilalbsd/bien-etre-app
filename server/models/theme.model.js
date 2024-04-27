const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Theme = sequelize.define('Theme', {
  id: {
    type: DataTypes.STRING, // ou INTEGER si vous utilisez un ID numérique
    primaryKey: true,
    allowNull: false
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Theme;
