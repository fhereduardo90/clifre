'use strict';
var bcrypt = require('bcrypt');
var Promise = require('bluebird');
var shortid = require('shortid');

function generateEncryptPassword(password) {
  return bcrypt.hashSync(password, 10);
}

module.exports = function userModel(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'name cannot be blank'}
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: { msg: 'email format is not correct' },
        notEmpty: function notEmpty(value, next) {
          if (this.isNewRecord) {
            if (this.facebookId && !value) return next();
            if (value) return next();
            else return next('email cannot be blank');
          } else {
            if (!this.email && !value) return next();
            if (!value) return next('email cannot be blank');
            else return next();
          }
        },
        isUnique: function isUnique(value, next) {
          if (!value) return next();
          var params = {email: value};
          if (!this.isNewRecord && this.email === value) return next();
          return User.count({where: params})
            .then(function success(user) {
              if (user) return next('email has been already taken');
              else next();
            })
            .catch(function error(err) {
              return next(err.message);
            });
        }
      }
    },
    identifier: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'identifier cannot be blank'},
        isUnique: function isUnique(value, next) {
          if (!value) return next();
          var params = {identifier: value};
          if (!this.isNewRecord && this.identifier === value) return next();
          return User.count({where: params})
            .then(function success(user) {
              if (user) return next('identifier has been already taken');
              else next();
            })
            .catch(function error(err) {
              return next(err.message);
            });
        }
      }
    },
    birthdate: {
      type: DataTypes.DATE,
      validate: {
        isDate: {msg: 'birthdate must be a date'}
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
        notEmpty: { msg: 'password cannot be blank' },
        len: { args: [8, 25], msg: 'password only accepts min 8 and max 25 characters' }
      }
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
      field: 'reset_password_token'
    },
    resetPasswordExpires: {
      type: DataTypes.DATE,
      field: 'reset_password_expires'
    },
    facebookId: {
      type: DataTypes.STRING,
      field: 'facebook_id',
      validate: {
        isUnique: function isUnique(value, next) {
          if (!value) return next();
          return User.count({where: {facebookId: value}})
            .then(function success(user) {
              if (user) return next('facebookId has been already taken');
              else next();
            })
            .catch(function error(err) {
              return next(err.message);
            });
        }
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    }
  }, {
    underscored: true,
    tableName: 'users',
    setterMethods: {
      isPasswordEncrypted: function temporalPassword(value) {
        this.setDataValue('_isPasswordEncrypted', value);
      }
    },
    getterMethods: {
      isPasswordEncrypted: function temporalPassword() {
        return this.getDataValue('_isPasswordEncrypted') || false;
      }
    },
    hooks: {
      beforeValidate: function beforeCreate(user) {
        if (user.facebookId && !user.password) {
          user.password = shortid.generate().toLowerCase();
        }
      },
      afterValidate: function beforeUpdate(user) {
        /* eslint-disable no-param-reassign */
        if (user.password && !user.isPasswordEncrypted) {
          user.password = generateEncryptPassword(user.password);
          user.isPasswordEncrypted = true;
        }
        /* eslint-enable no-param-reassign */
      }
    },
    classMethods: {
      associate: function(models) {
        User.hasMany(models.UserCard, {as: 'UserCards'});
        User.belongsToMany(models.Card, {through: models.UserCard});
        User.belongsToMany(models.User,
          {as: 'Companies', through: 'user_cards', foreignKey: 'user_id'}
        );
      },
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
