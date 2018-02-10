const i18nIsoCountries = require('i18n-iso-countries/langs/es.json');

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'countries',
      Object.values(i18nIsoCountries.countries).map(name => ({
        name,
        created_at: new Date(),
        updated_at: new Date(),
      })),
      {},
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('countries', null, {}),
};
