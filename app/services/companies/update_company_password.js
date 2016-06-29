var sequelize = require('../../models');
var ApiError = require('../../errors/api_error');
var errorParse = require('../../helpers/error_parse');
var Promise = require('bluebird');
var bcrypt = require('bcrypt');
var _ = require('lodash');

module.exports.call = function (params) {
  return Promise.try(function findCompany() {
    try {
      if (!params || !_.isObject(params)) throw new Error('Params are not correct.');
      return sequelize.Company.findOne(
        {where: {resetPasswordToken: params.resetToken}, attributes: ['id', 'resetPasswordExpires']}
      )
        .then(function success(company) {
          if (!company) throw new Error('Company not found.');
          if (company.resetPasswordExpires < Date.now()) throw new Error('Reset Token has expired.');
          company.password = params.password;
          company.resetPasswordToken = bcrypt.genSaltSync(15);
          company.resetPasswordExpires = Date.now(); // 1 day.
          return company.save();
        })
        .then(function success(company) {
          return {result: {resetToken: company.resetPasswordToken}, status: 200};
        })
        .catch(function error(err) {
          throw new ApiError('Company not found.', 422, errorParse(err));
        });
    } catch (e) {
      throw new ApiError('Company not found.', 422, errorParse(e));
    }
  });
};
