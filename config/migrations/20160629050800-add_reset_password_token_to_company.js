'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('companies', 'reset_password_token', {
      type: Sequelize.STRING,
      unique: true
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('companies', 'reset_password_token');
  }
};
