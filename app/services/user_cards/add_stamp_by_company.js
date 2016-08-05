// Libs
var Promise = require('bluebird');
var _ = require('lodash');
// Helpers
var errorParse = require('../../helpers/error_parse');
// Others
var ApiError = require('../../errors/api_error');
var sequelize = require('../../models');

module.exports.call = function(company, userId, id) {
  return new Promise.try(function promise() {
    try {
      if (!_.isObject(company) || !userId || !id) {
        throw new Error('Parameters are incorrect.');
      }

      return sequelize.UserCard.findOne({
        where: {companyId: company.id, userId: userId, id: id },
        attributes: ['id', 'sealedDates'],
        include: [{model: sequelize.Card, attributes: ['stamps']}]
      }).then(function success(userCard) {
        if (!userCard) throw new Error('User Card not found.');
        if (userCard.sealedDates.length >= userCard.Card.stamps) {
          throw new Error('The card has reached its stamps limit.');
        }
        userCard.sealedDates = userCard.sealedDates.concat([Date.now()]).slice();
        return userCard.save();
      }).then(function success() {
        return {result: null, status: 204};
      }).catch(function error(err) {
        throw new ApiError('New stamp could not be added.', 422, errorParse(err));
      });
    } catch (e) {
      throw new ApiError('New stamp could not be added.', 422, errorParse(e));
    }
  });
};
