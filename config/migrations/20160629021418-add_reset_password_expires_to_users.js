'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('users', 'reset_password_expires', {
      type: Sequelize.DATE
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('users', 'reset_password_expires');
  }
};
