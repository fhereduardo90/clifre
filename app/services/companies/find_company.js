const sequelize = require('../../models');
const ApiError = require('../../errors/api_error');
const errorParse = require('../../helpers/error_parse');
const CompanyDetailSerializer = require('../../serializers/companies/company_detail');
const CategoryDetailSerializer = require('../../serializers/categories/category_detail');
const CountryDetailSerializer = require('../../serializers/countries/country_detail');

module.exports.call = async (id) => {
  try {
    const company = await sequelize.Company.findOne({
      where: { id },
      include: [{ model: sequelize.Category }, { model: sequelize.Country }],
    });

    return {
      result: {
        ...CompanyDetailSerializer.serialize(company),
        ...(company.Category
          ? { category: CategoryDetailSerializer.serialize(company.Category) }
          : {}),
        ...(company.Country
          ? { country: CountryDetailSerializer.serialize(company.Country) }
          : {}),
      },
      status: 200,
    };
  } catch (error) {
    throw new ApiError('Company not found.', 404, errorParse(e));
  }
};
