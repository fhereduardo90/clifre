'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('companies', 'reset_password_expires', {
      type: Sequelize.DATE
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('companies', 'reset_password_expires');
  }
};
