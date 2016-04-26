var bcrypt     = require('bcrypt');
var Promise    = require('bluebird');
'use strict';

module.exports = function(sequelize, DataTypes) {
  var Company = sequelize.define('Company', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'name can\'t be blank'}
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {msg: 'email is not valid.'},
        notEmpty: {msg: 'email can\'t be blank.'}
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
    avatar: {
      type: DataTypes.STRING,
    },
    avatarName: {
      type: DataTypes.STRING,
      field: 'avatar_name'
    },
    identifier: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {msg: 'identifier can\'t be blank.'}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'password can\'t be blank'},
        len: {args: [8,25], msg: 'password only accepts min 8 and max 25 characters.'}
      }
    }
  }, {
    underscored: true,
    tableName: 'companies',
    hooks: {
      afterValidate: function(user, options) {
        if (user.password) user.password = bcrypt.hashSync(user.password, 10);
      }
    },
    classMethods: {
      associate: function(models) {
        Company.hasMany(models.Card, {as: 'Cards'});
      },
      authenticate: function(password, password_hash) {
        return new Promise(function (resolve, reject) {
          bcrypt.compare(password, password_hash, function(err, res) {
            if (err) return reject(err);
            if (!res) return reject(new Error('Authentication failed. Wrong email or password.'));
            return resolve(true);
          });
        });
      }
    }
  });
  return Company;
}
