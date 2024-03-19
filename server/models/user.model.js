const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true // Champ optionnel
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true // Champ optionnel
  },
  activity: {
    type: DataTypes.STRING,
    allowNull: true // Champ optionnel
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true // Champ optionnel
  }
});

module.exports = User;
