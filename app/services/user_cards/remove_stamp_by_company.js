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
      return sequelize.UserCard.findOne({
        where: {companyId: company.id, userId: userId, id: id },
        attributes: ['id', 'sealedDates'],
        include: [{model: sequelize.Card, attributes: ['stamps']}]
      })
        .then(function success(userCard) {
          if (!userCard) throw new Error('User Card not found.');
          if (userCard.sealedDates.length === 0) throw new Error('The card does not have any stamp.');
          userCard.sealedDates.pop();
          userCard.sealedDates = userCard.sealedDates.slice();
          return userCard.save();
        })
        .then(function success(userCard) {
          return {result: userCard, status: 200};
        })
        .catch(function error(err) {
          throw new ApiError('Could not remove the stamp.', 422, errorParse(err));
        });
    } catch (e) {
      throw new ApiError('Could not remove the stamp.', 422, errorParse(e));
    }
  });
};
