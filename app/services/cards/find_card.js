// Libs
var _             = require('lodash');
var Promise       = require('bluebird');
// Helpers
var errorParse    = require('../../helpers/error_parse');
// Others
var ApiError      = require('../../errors/api_error');
var sequelize     = require('../../models');

module.exports.call = function(company, params) {
  return new Promise.try(function () {
    try {
      var attrs = ['id', 'title', 'stamps', 'description', 'color'];
      return company.getCards({where: {id: params.id}, attributes: attrs})
        .then(function (cards) {
          if (_.isEmpty(cards)) throw new Error('Card not found.');
          return {result: cards[0], status: 200, success: true,
            message: '', errors: []};
        })
        .catch(function (err) {
          throw new ApiError('Card not found.', 422, errorParse(err));
        });
    } catch (err) {
      throw new ApiError('Card not found.', 422, errorParse(err));
    }
  });
};
