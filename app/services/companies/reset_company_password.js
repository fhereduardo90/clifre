var sequelize = require('../../models');
var ApiError = require('../../errors/api_error');
var errorParse = require('../../helpers/error_parse');
var Promise = require('bluebird');
var bcrypt = require('bcrypt');

module.exports.call = function (email) {
  return Promise.try(function findCompany() {
    try {
      if (!email) throw new Error('Params are not correct.');
      return sequelize.Company.findOne({where: {email: email}, attributes: ['id']})
        .then(function success(company) {
          if (!company) throw new Error('Company not found.');
          company.resetPasswordToken = bcrypt.genSaltSync(15);
          company.resetPasswordExpires = Date.now() + 86400000; // 1 day.
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
