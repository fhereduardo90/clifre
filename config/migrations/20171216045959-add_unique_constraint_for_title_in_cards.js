'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addIndex('cards', ['title', 'company_id'], {
      type: 'unique',
      name: 'custom_unique_title_constraint',
    });
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.removeIndex(
      'cards',
      'custom_unique_title_constraint'
    );
  },
};
