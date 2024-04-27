const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Question = sequelize.define('Question', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true, 
    allowNull: false
  },
  themeId: {
    type: DataTypes.STRING,
    allowNull: false, // themeId ne peut pas être null
    references: {
      model: 'Themes',
      key: 'id'
    }
  },
  question: {
    type: DataTypes.STRING,
    allowNull: false // Assurez-vous que chaque question a une valeur
  }
});

module.exports = Question;
