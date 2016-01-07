'use strict';

var sequelizeConnection = require('../../config/database');
var DataTypes = require('sequelize');

module.exports = sequelizeConnection.define('company', {
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
  about: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
  },
  avatar_name: {
    type: DataTypes.STRING,
  },
  avatar_path: {
    type: DataTypes.STRING,
  }
}, {
  underscored: true
});
