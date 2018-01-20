'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'categories',
      [
        {
          name: 'Belleza',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Maquillaje',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Comida',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('categories', null, {}),
};
