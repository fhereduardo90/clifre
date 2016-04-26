// Libs
var _             = require('lodash');
var Promise       = require('bluebird');
// Helpers
var errorParse    = require('../../helpers/error_parse');
// Others
var ApiError      = require('../../errors/api_error');
var sequelize     = require('../../models');

module.exports.call = function(company) {
  return new Promise.try(function () {
    try {
      var attrs = ['id', 'title', 'stamps', 'description', 'color'];
      return company.getCards({attributes: attrs})
        .then(function (cards) {
          return {result: cards, status: 200, success: true,
            message: '', errors: []};
        })
        .catch(function (err) {
          throw new ApiError('Card could not be found.', 422, errorParse(err));
        });
    } catch (err) {
      throw new ApiError('Cards could not be found.', 422, errorParse(err));
    }
  });
};
