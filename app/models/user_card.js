'use strict';
module.exports = function card(sequelize, DataTypes) {
  var UserCard = sequelize.define('UserCard', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    sealedDates: {
      type: DataTypes.ARRAY(DataTypes.DATE),
      allowNull: false,
      defaultValue: [],
      field: 'sealed_dates'
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    }
  }, {
    underscored: true,
    tableName: 'user_cards',
    classMethods: {
      associate: function association(models) {
        UserCard.belongsTo(models.Card, {
          onDelete: 'CASCADE',
          foreignKey: {
            type: DataTypes.INTEGER,
            allowNull: false,
            name: 'cardId',
            field: 'card_id'
          }
        });

        UserCard.belongsTo(models.User, {
          onDelete: 'CASCADE',
          foreignKey: {
            type: DataTypes.INTEGER,
            allowNull: false,
            name: 'userId',
            field: 'user_id'
          }
        });

        UserCard.belongsTo(models.Company, {
          onDelete: 'CASCADE',
          foreignKey: {
            type: DataTypes.INTEGER,
            allowNull: false,
            name: 'companyId',
            field: 'company_id'
          }
        });
      }
    }
  });
  return UserCard;
};
