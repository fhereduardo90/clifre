// Libs
var _ = require('lodash');
var Promise = require('bluebird');
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
      return sequelize.UserCard.findOne({
        where: {companyId: company.id, userId: userId, id: id},
        attributes: ['id', 'userId', 'cardId', 'sealedDates', 'createdAt', 'companyId'],
        include: [{model: sequelize.Card, attributes: ['stamps', 'title', 'description', 'color']}]
      })
        .then(function success(userCard) {
          if (!userCard) throw new Error('User Card not found');
          var result = _.pick(userCard, ['id', 'userId', 'cardId', 'companyId', 'sealedDates', 'createdAt']);
          result.stamps = userCard.Card.stamps;
          result.title = userCard.Card.title;
          result.description = userCard.Card.description;
          result.color = userCard.Card.color;
          return {result: result, status: 200};
        })
        .catch(function error(err) {
          throw new ApiError('User Card not found.', 422, errorParse(err));
        });
    } catch (e) {
      throw new ApiError('User Card not found.', 422, errorParse(e));
    }
  });
};
