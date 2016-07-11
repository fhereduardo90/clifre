'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('user_cards', 'company_id', {
      type: Sequelize.INTEGER,
      references: 'companies',
      referenceKey: 'id',
      allowNull: false
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('user_cards', 'company_id');
  }
};
