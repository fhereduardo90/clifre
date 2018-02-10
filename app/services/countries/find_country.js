const sequelize = require('../../models');
const errorParse = require('../../helpers/error_parse');
const ApiError = require('../../errors/api_error');
const CountryDetailSerializer = require('../../serializers/countries/country_detail');

module.exports.call = async id => {
  try {
    const category = await sequelize.Country.findOne({ where: { id } });

    if (!category) {
      throw new Error('Country not found.');
    }

    return {
      result: CountryDetailSerializer.serialize(category),
      status: 200,
    };
  } catch (error) {
    throw new ApiError('Country not found.', 404, errorParse(error));
  }
};
