module.exports = {
  up(queryInterface) {
    return queryInterface.addIndex('featured_companies', ['company_id'], {
      type: 'unique',
      name: 'company_id_unique_constraint',
    });
  },

  down(queryInterface) {
    return queryInterface.removeIndex('featured_companies', 'company_id_unique_constraint');
  },
};
