// Libs
var _ = require('lodash');
var Promise = require('bluebird');
// Helpers
var errorParse = require('../../helpers/error_parse');
// Others
var ApiError = require('../../errors/api_error');
var sequelize= require('../../models');

module.exports.call = function(company, userId) {
  return new Promise.try(function promise() {
    try {
      if (!company || !userId) throw new Error('Params are incorrect.');
      return sequelize.UserCard.findAll({
        where: {userId: userId, companyId: company.id},
        attributes: ['id', 'userId', 'cardId', 'companyId', 'sealedDates'],
        include: [{model: sequelize.Card, attributes: ['stamps']}]
      })
        .then(function success(userCards) {
          if (!userCards) throw new Error('User Cards not found');
          var result = {};
          var userCardsResult = userCards.map(function map(userCard) {
            result = _.pick(userCard, ['id', 'userId', 'cardId', 'sealedDates', 'createdAt']);
            result.stamps = userCard.Card.stamps;
            return result;
          });
          return {result: userCardsResult, status: 200};
        })
        .catch(function error(err) {
          throw new ApiError('User Cards could not be found.', 422, errorParse(err));
        });
    } catch (e) {
      throw new ApiError('User Cards could not be found.', 422, errorParse(e));
    }
  });
};
