'use strict';
module.exports = function device(sequelize, DataTypes) {
  var Device = sequelize.define('Device', {
    registrationId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'registrationId cannot be blank'}
      },
      field: 'registration_id'
    },
    platform: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'platform cannot be blank'}
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    }
  }, {
    underscored: true,
    tableName: 'devices',
    classMethods: {
      associate: function(models) {
        Device.belongsTo(models.User, {
          onDelete: 'CASCADE',
          foreignKey: {
            type: DataTypes.INTEGER,
            allowNull: false,
            name: 'userId',
            field: 'user_id'
          }
        });
      }
    }
  });
  return Device;
};