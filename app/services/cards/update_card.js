// Libs
var _ = require('lodash');
var Promise = require('bluebird');
// Helpers
var errorParse = require('../../helpers/error_parse');
// Others
var ApiError = require('../../errors/api_error');
var sequelize = require('../../models');

module.exports.call = function(company, params) {
  return new Promise.try(function () {
    try {
      var attrs = ['id', 'title', 'stamps', 'description', 'color'];
      return company.getCards({where: {id: params.id}, attributes: attrs})
        .then(function success(cards) {
          if (_.isEmpty(cards)) throw new Error('Card not found.');
          return cards[0].update(_.omit(params, ['id']))
        })
        .then(function success(card) {
          return {result: card, status: 200};
        })
        .catch(function error(err) {
          throw new ApiError('Card could not be updated.', 422, errorParse(err));
        });
    } catch (err) {
      throw new ApiError('Card could not be updated.', 422, errorParse(err));
    }
  });
};
