'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('companies', 'category_id', {
      type: Sequelize.INTEGER,
      references: 'categories',
      referenceKey: 'id',
    }),

  down: (queryInterface, Sequelize) =>
    queryInterface.removeColumn('companies', 'category_id'),
};
