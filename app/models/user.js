'use strict';

var sequelizeConnection = require('../../config/database');
var DataTypes = require('sequelize');

module.exports = sequelizeConnection.define('user', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  identifier: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true,
    validate: {
      notEmpty: true
    }
  },
  birthdate: {
    type: DataTypes.DATE,
    validate: {
      isDate: true
    }
  }
}, {
  underscored: true
});
