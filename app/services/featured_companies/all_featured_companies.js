// Libs
const Promise = require('bluebird');
const sequelize = require('../../models');
// Helpers
const errorParse = require('../../helpers/error_parse');
// Serializers
const FeaturedCompanyDetailSerializer = require('../../serializers/featured_companies/feature_company_detail');
const CompanyDetailSerializer = require('../../serializers/companies/company_detail');
// Others
const ApiError = require('../../errors/api_error');

/* eslint arrow-body-style: "off" */
module.exports.call = () => {
  return Promise.try(() => {
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
      throw new ApiError('Featured Companies not found.', 404, errorParse(err));
    }
  });
};
