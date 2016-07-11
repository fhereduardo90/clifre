// Libs
var Promise = require('bluebird');
var _ = require('lodash');
// Helpers
var errorParse = require('../../helpers/error_parse');
// Others
var ApiError = require('../../errors/api_error');
var sequelize= require('../../models');

module.exports.call = function(company, userId, id) {
  return new Promise.try(function promise() {
    try {
      if (!company || !_.isObject(company) || !userId || !id) {
        throw new Error('Params are incorrect.');
      }
      return sequelize.UserCard.destroy({where: {companyId: company.id, userId: userId, id: id}})
        .then(function success(userCards) {
          if (userCards === 0) throw new Error('User Card not found');
          return {result: null, status: 200};
        })
        .catch(function error(err) {
          throw new ApiError('User Card could not be deleted.', 422, errorParse(err));
        });
    } catch (e) {
      throw new ApiError('User Card could not be deleted.', 422, errorParse(e));
    }
  });
};
