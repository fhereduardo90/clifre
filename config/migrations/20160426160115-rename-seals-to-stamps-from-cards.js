'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.renameColumn('cards', 'seals', 'stamps');
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.renameColumn('cards', 'stamps', 'seals');
  }
};
