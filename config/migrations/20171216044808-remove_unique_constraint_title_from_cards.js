'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.sequelize.query(
      'ALTER TABLE cards DROP CONSTRAINT title_unique_idx;'
    );
    return queryInterface.removeIndex('cards', 'title_unique_idx');
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.changeColumn('cards', 'title', {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    });
  },
};
