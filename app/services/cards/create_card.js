// Libs
var _ = require('lodash');
// Helpers
var errorParse = require('../../helpers/error_parse');
// Others
var ApiError = require('../../errors/api_error');
var sequelize = require('../../models');
var Promise = require('bluebird');

module.exports.call = function(company, params) {
  return new Promise.try(function promise() {
    try {
      params.companyId = company.id;
      return company.createCard(params)
        .then(function success(card) {
          var response = _.pick(card, ['id', 'title', 'stamps', 'description', 'color']);
          return {result: response, status: 201};
        })
        .catch(function error(err) {
          throw new ApiError('Card could not be created.', 422, errorParse(err));
        })
    } catch (err) {
      throw new ApiError('Card could not be created.', 422, errorParse(err));
    }
  });
};
