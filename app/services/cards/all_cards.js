// Libs
var _ = require('lodash');
var Promise = require('bluebird');
// Helpers
var errorParse = require('../../helpers/error_parse');
// Others
var ApiError = require('../../errors/api_error');
var sequelize= require('../../models');

module.exports.call = function(company) {
  return new Promise.try(function promise() {
    try {
      return company.getCards({attributes: ['id', 'title', 'stamps', 'description', 'color']})
        .then(function success(cards) {
          return {result: cards, status: 200};
        })
        .catch(function error(err) {
          throw new ApiError('Card could not be found.', 422, errorParse(err));
        });
    } catch (err) {
      throw new ApiError('Cards could not be found.', 422, errorParse(err));
    }
  });
};
