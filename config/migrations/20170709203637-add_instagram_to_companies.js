'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('companies', 'instagram', {
      type: Sequelize.STRING,
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('companies', 'instagram');
  }
};
