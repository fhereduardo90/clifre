'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('companies', 'avatar', Sequelize.STRING);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('companies', 'avatar');
  }
};
