'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('companies', 'avatar_path');
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('companies', 'avatar_path', Sequelize.STRING);
  }
};
