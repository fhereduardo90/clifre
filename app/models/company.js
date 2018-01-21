'use strict';
let bcrypt = require('bcryptjs');
let Promise = require('bluebird');

function generateEncryptPassword(password) {
  return bcrypt.hashSync(password, 10);
}

module.exports = function(sequelize, DataTypes) {
  const Company = sequelize.define(
    'Company',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {msg: 'name can\'t be blank'},
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {msg: 'email format is not correct.'},
          notEmpty: function notEmpty(value, next) {
            if (this.isNewRecord) {
              if (value) return next();
              else return next('email can\'t be blank.');
            } else {
              if (!this.email && !value) return next();
              if (!value) return next('email can\'t be blank.');
              else return next();
            }
          },
          isUnique: function isUnique(value, next) {
            if (!value) return next();
            let params = {email: value};
            if (!this.isNewRecord && this.email === value) return next();
            return Company.find({where: params, attributes: ['id']})
              .then(function success(company) {
                if (company) return next('email has been already taken.');
                else next();
              })
              .catch(function error(err) {
                return next(err.message);
              });
          },
        },
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
        field: 'avatar_name',
      },
      facebookPage: {
        type: DataTypes.STRING,
        field: 'facebook_page',
      },
      web: {
        type: DataTypes.STRING,
        field: 'web',
      },
      instagram: {
        type: DataTypes.STRING,
        field: 'instagram',
      },
      identifier: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {msg: 'identifier can\'t be blank.'},
        },
      },
      password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      resetPasswordToken: {
        type: DataTypes.STRING,
        field: 'reset_password_token',
      },
      resetPasswordExpires: {
        type: DataTypes.DATE,
        field: 'reset_password_expires',
      },
      password: {
        type: DataTypes.VIRTUAL,
        allowNull: false,
        get() {
          return this.getDataValue('password');
        },
        set(value) {
          this.setDataValue('password', value);
        },
        validate: {
          notEmpty: {msg: 'password can\'t be blank'},
          len: {
            args: [8, 25],
            msg: 'password only accepts min 8 and max 25 characters.',
          },
        },
      },
      visible: {
        type: DataTypes.BOOLEAN,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
      },
    },
    {
      underscored: true,
      tableName: 'companies',
      hooks: {
        beforeValidate: function beforeUpdate(company) {
          if (company.password) {
            company.password_hash = generateEncryptPassword(company.password);
          }
        },
      },
      classMethods: {
        associate: function(models) {
          Company.hasMany(models.Card, {as: 'Cards'});
          Company.hasMany(models.FeaturedCompany, {as: 'FeaturedCompanies'});
          Company.hasMany(models.UserCard, {as: 'UserCards'});
          Company.belongsToMany(models.User, {
            as: 'Users',
            through: 'user_cards',
            foreignKey: 'company_id',
          });
          Company.belongsTo(models.Category, {
            foreignKey: {
              allowNull: true,
              name: 'categoryId',
              field: 'category_id',
            },
          });
        },
        authenticate: function authenticate(password, passwordHash) {
          return new Promise(function promise(resolve, reject) {
            bcrypt.compare(password, passwordHash, function compare(err, res) {
              if (err) return reject(err);
              if (!res) {
                return reject(
                  new Error('Authentication failed. Wrong email or password.')
                );
              }
              return resolve(true);
            });
          });
        },
      },
    }
  );
  return Company;
};
