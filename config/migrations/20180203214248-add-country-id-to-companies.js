'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('companies', 'country_id', {
      type: Sequelize.INTEGER,
      references: 'countries',
      referenceKey: 'id',
    }),

  down: (queryInterface, Sequelize) =>
    queryInterface.removeColumn('companies', 'country_id'),
};
