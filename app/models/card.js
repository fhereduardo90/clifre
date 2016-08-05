'use strict';

module.exports = function card(sequelize, DataTypes) {
  var Card = sequelize.define('Card', {
    stamps: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: 'stamps must be a positve integer.' },
        min: { args: true, msg: 'stamps must be greater or equal than 0.' }
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: 'title can\'t be blank' }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'description can\'t be blank' }
      }
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'color can\'t be blank' }
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    }
  }, {
    underscored: true,
    tableName: 'cards',
    classMethods: {
      associate: function(models) {
        Card.hasMany(models.UserCard, {as: 'UserCards'});
        Card.belongsToMany(models.User, {through: models.UserCard});
        Card.belongsTo(models.Company, {
          onDelete: 'CASCADE',
          foreignKey: {
            allowNull: false,
            name: 'companyId',
            field: 'company_id'
          }
        });
      }
    }
  });
  return Card;
};
