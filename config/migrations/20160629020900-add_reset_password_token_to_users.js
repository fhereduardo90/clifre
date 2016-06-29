'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('users', 'reset_password_token', {
      type: Sequelize.STRING,
      unique: true
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('users', 'reset_password_token');
  }
};
