// Libs
var _ = require('lodash');
var Promise = require('bluebird');
// Helpers
var errorParse = require('../../helpers/error_parse');

// Others
var ApiError = require('../../errors/api_error');
var sequelize = require('../../models');

module.exports.call = function(company, identifier) {
  return new Promise.try(function promise() {
    try {
      if (!_.isObject(company) || !identifier) {
        throw new Error('Parameters are incorrect.');
      }

      params = {
        companyId: company.id,
        sealedDates: []
      };

      var cardFound;

      return sequelize.Card.findOne({
        where: { companyId: company.id },
        attributes: ['id', 'stamps', 'color', 'description', 'title', 'createdAt'],
        order: '"createdAt" DESC'
      }).then(function success(card) {
        if (!card) throw new Error('Company does not have any card.');
        cardFound = card;
        params.cardId = card.id;
        return sequelize.User.findOne({
          where: { identifier: identifier },
          attributes: ['id', 'name', 'email', 'identifier', 'birthdate', 'avatar', 'createdAt']
        }); 
      }).then(function success(user) {
        if (!user) throw new Error('User not found');
        params.userId = user.id;
        return sequelize.UserCard.create(params);
      }).then(function success(userCard) {
        if (!userCard) throw new Error('User Card could not be created');
        userCard.Card = cardFound;
        return userCard;
      }).catch(function error(err) {
        throw new ApiError('User Card could not be created.', 422, errorParse(err));
      });
    } catch (e) {
      throw new ApiError('User Card could not be created.', 422, errorParse(e));
    }

  });

};
