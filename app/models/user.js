'use strict';

var sequelizeConnection = require('../../config/database');
var DataTypes = require('sequelize');

module.exports = sequelizeConnection.define('user', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  identifier: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true
  },
  birthdate: {
    type: DataTypes.DATE
  }
}, {
  underscored: true
});
