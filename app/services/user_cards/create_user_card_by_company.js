// Libs
var _ = require('lodash');
var Promise = require('bluebird');
// Helpers
var errorParse = require('../../helpers/error_parse');
// Others
var ApiError = require('../../errors/api_error');
var sequelize= require('../../models');

module.exports.call = function(company, params) {
  return new Promise.try(function promise() {
    try {
      if (!company || (!params || !_.isObject(params))) throw new Error('Params are incorrect.');
      params.companyId = company.id;
      params.sealedDates = [];
      var cardFound = {};
      return sequelize.Card.findOne({
        where: {companyId: company.id, id: params.cardId},
        attributes: ['id', 'stamps']
      })
        .then(function success(card) {
          if (!card) throw new Error('Card not found.');
          cardFound = card;
          return card.createUserCard(params);
        })
        .then(function success(userCard) {
          if (!userCard) throw new Error('User Card could not be created');
          var result = _.pick(userCard, ['id', 'userId', 'cardId', 'companyId', 'sealedDates']);
          result.stamps = cardFound.stamps;
          return {result: result, status: 201};
        })
        .catch(function error(err) {
          throw new ApiError('User Card could not be created.', 422, errorParse(err));
        });
    } catch (e) {
      throw new ApiError('User Card could not be created.', 422, errorParse(e));
    }
  });
};
