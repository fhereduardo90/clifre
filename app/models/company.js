'use strict';

module.exports = function(sequelize, DataTypes) {
  var Company = sequelize.define('Company', {
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
    underscored: true,
    tableName: 'companies',
    classMethods: {
      associate: function(models) {
        Company.hasMany(models.Card, {as: 'Cards'});
      }
    }
  });
  return Company;
}
