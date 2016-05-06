'use strict';
var bcrypt = require('bcrypt');
var Promise = require('bluebird');

module.exports = function userModel(sequelize, DataTypes) {
  var User = sequelize.define('User', {
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
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    birthdate: {
      type: DataTypes.DATE,
      validate: {
        isDate: true
      }
    },
    avatar: {
      type: DataTypes.STRING
    },
    avatarName: {
      type: DataTypes.STRING,
      field: 'avatar_name'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'password can\'t be blank' },
        len: { args: [8, 25], msg: 'password only accepts min 8 and max 25 characters.' }
      }
    }
  }, {
    underscored: true,
    tableName: 'users',
    setterMethods: {
      temporalPassword: function temporalPassword(value) {
        this.setDataValue('_temporalPassword', value);
      }
    },
    getterMethods: {
      temporalPassword: function temporalPassword() {
        return this.getDataValue('_temporalPassword');
      }
    },
    hooks: {
      afterValidate: function checkPassword(user) {
        if (user.temporalPassword) {
          /* eslint-disable no-param-reassign */
          user.password = bcrypt.hashSync(user.temporalPassword, 10);
          user.temporalPassword = null;
          /* eslint-enable no-param-reassign */
        }
      }
    },
    classMethods: {
      authenticate: function authenticate(password, passwordHash) {
        return new Promise(function promise(resolve, reject) {
          bcrypt.compare(password, passwordHash, function compare(err, res) {
            if (err) return reject(err);
            if (!res) return reject(new Error('Authentication failed. Wrong email or password.'));
            return resolve(true);
          });
        });
      }
    }
  });

  return User;
};
