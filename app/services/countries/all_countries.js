const sequelize = require('../../models');
const errorParse = require('../../helpers/error_parse');
const ApiError = require('../../errors/api_error');
const CountryDetailSerializer = require('../../serializers/countries/country_detail');

module.exports.call = async () => {
  try {
    const countries = await sequelize.Country.findAll();
    return {
      result: countries.map(c => CountryDetailSerializer.serialize(c)),
      status: 200,
    };
  } catch (error) {
    throw new ApiError('Countries not found.', 404, errorParse(error));
  }
};
