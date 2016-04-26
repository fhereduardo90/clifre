var bcrypt     = require('bcrypt');
var Promise    = require('bluebird');
'use strict';

module.exports = function(sequelize, DataTypes) {
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
        notEmpty: {msg: 'password can\'t be blank'},
        len: {args: [8,25], msg: 'password only accepts min 8 and max 25 characters.'}
      }
    }
  }, {
    underscored: true,
    tableName: 'users',
    hooks: {
      afterValidate: function(user, options) {
        if (user.password) user.password = bcrypt.hashSync(user.password, 10);
      }
    },
    classMethods: {
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
  }
);

  return User;
}
