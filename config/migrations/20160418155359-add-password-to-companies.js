'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('companies', 'password', {
      type: Sequelize.STRING,
      allowNull: false
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('companies', 'password');
  }
};
