const sequelize = require('../../models');
const errorParse = require('../../helpers/error_parse');
const ApiError = require('../../errors/api_error');
const CompanyDetailSerializer = require('../../serializers/companies/company_detail');
const CategoryDetailSerializer = require('../../serializers/categories/category_detail');
const CountryDetailSerializer = require('../../serializers/countries/country_detail');

module.exports.call = async () => {
  try {
    const companies = await sequelize.Company.findAll({
      where: { visible: true },
      order: [['created_at', 'DESC']],
      include: [{ model: sequelize.Category }, { model: sequelize.Country }],
    });

    return {
      result: companies.map(c => ({
        ...CompanyDetailSerializer.serialize(c),
        ...(c.Category
          ? { category: CategoryDetailSerializer.serialize(c.Category) }
          : {}),
        ...(c.Country
          ? { country: CountryDetailSerializer.serialize(c.Country) }
          : {}),
      })),
      status: 200,
    };
  } catch (error) {
    throw new ApiError('Companies not found.', 422, errorParse(error));
  }
};
