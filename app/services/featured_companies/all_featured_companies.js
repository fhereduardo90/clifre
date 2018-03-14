const sequelize = require('../../models');
const errorParse = require('../../helpers/error_parse');
const FeaturedCompanyDetailSerializer = require('../../serializers/featured_companies/feature_company_detail');
const CompanyDetailSerializer = require('../../serializers/companies/company_detail');
const CategoryDetailSerializer = require('../../serializers/categories/category_detail');
const CountryDetailSerializer = require('../../serializers/countries/country_detail');
const ApiError = require('../../errors/api_error');

module.exports.call = async () => {
  try {
    return sequelize.FeaturedCompany.findAll({ order: '"createdAt" DESC', include: [{ model: sequelize.Company }] })
        .then(featuredCompanies => ({
          result: featuredCompanies.map((featuredCompany) => {
            return Object.assign(
              {},
              FeaturedCompanyDetailSerializer.serialize(featuredCompany),
              { company: CompanyDetailSerializer.serialize(featuredCompany.Company) }
            );
          }),
          status: 200,
        }))
        .catch((err) => {
          throw new ApiError('Featured Companies not be found.', 404, errorParse(err));
        });
  } catch (err) {
    throw new ApiError('Featured Companies not found.', 422, errorParse(err));
  }
};
