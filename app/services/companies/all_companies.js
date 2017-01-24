const sequelize = require('../../models');
const errorParse = require('../../helpers/error_parse');
const ApiError = require('../../errors/api_error');
// Serializers
const CompanyDetailSerializer = require('../../serializers/companies/company_detail');

/* eslint arrow-body-style: "off" */
module.exports.call = () => {
  return sequelize.Company.findAll()
    .then(companies => ({
      result: companies.map((company) => {
        return CompanyDetailSerializer.serialize(company);
      }),
      status: 200,
    }))
    .catch((err) => {
      throw new ApiError('Companies not found.', 404, errorParse(err));
    });
};

