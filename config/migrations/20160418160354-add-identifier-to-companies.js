'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('companies', 'identifier', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('companies', 'identifier');
  }
};
