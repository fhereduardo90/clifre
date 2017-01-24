const sequelize = require('../../models');
const ApiError = require('../../errors/api_error');
const errorParse = require('../../helpers/error_parse');
const Promise = require('bluebird');
// Serializers
const CompanyDetailSerializer = require('../../serializers/companies/company_detail');

/* eslint arrow-body-style: "off" */
module.exports.call = (id) => {
  return Promise.try(() => {
    try {
      if (!id || !Number.isInteger(id)) throw new Error('Params are not correct.');
      return sequelize.Company.findById(id)
        .then((company) => {
          if (!company) throw new Error('Company not found.');
          return { result: CompanyDetailSerializer.serialize(company), status: 200 };
        })
        .catch((err) => {
          throw new ApiError('Company not found.', 404, errorParse(err));
        });
    } catch (e) {
      throw new ApiError('User not found.', 404, errorParse(e));
    }
  });
};
