'use strict';

module.exports = {
  up: function(queryInterface) {
    return queryInterface.renameColumn(
      'companies',
      'password',
      'password_hash'
    );
  },

  down: function(queryInterface) {
    return queryInterface.renameColumn(
      'companies',
      'password_hash',
      'password'
    );
  },
};
