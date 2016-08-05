// Libs
var _ = require('lodash');
var Promise = require('bluebird');
// Helpers
var errorParse = require('../../helpers/error_parse');
// Serializers
var UserCardDetailSerializer = require('../../serializers/user_cards/user_card_detail');
var CompanyDetailSerializer = require('../../serializers/companies/company_detail');
var CardDetailSerializer = require('../../serializers/cards/card_detail');
var UserDetailSerializer = require('../../serializers/users/user_detail');
// Others
var ApiError = require('../../errors/api_error');
var sequelize = require('../../models');

module.exports.call = function(company, params) {
  return new Promise.try(function promise() {
    try {
      if (!_.isObject(company) || !_.isObject(params)) {
        throw new Error('Parameters are incorrect.');
      }

      params.companyId = company.id;
      params.sealedDates = [];
      var cardFound;
      var userFound;

      return sequelize.Card.findOne({
        where: {companyId: company.id, id: params.cardId},
        attributes: ['id', 'stamps', 'color', 'description', 'title', 'createdAt']
      }).then(function success(card) {
        if (!card) throw new Error('Card not found.');
        cardFound = card;
        return sequelize.User.findOne({
          where: {id: params.userId},
          attributes: ['id', 'name', 'email', 'identifier', 'birthdate', 'avatar', 'createdAt']
        });
      }).then(function success(user) {
        if (!user) throw new Error('User not found');
        userFound = user;
        return sequelize.UserCard.create(params);
      }).then(function success(userCard) {
        if (!userCard) throw new Error('User Card could not be created');
        return {
          result: _.merge(
            UserCardDetailSerializer.serialize(userCard),
            {
              relationships: {
                company: CompanyDetailSerializer.serialize(company),
                card: CardDetailSerializer.serialize(cardFound),
                user: UserDetailSerializer.serialize(userFound)
              }
            }
          ),
          status: 201
        };
      }).catch(function error(err) {
        throw new ApiError('User Card could not be created.', 422, errorParse(err));
      });
    } catch (e) {
      throw new ApiError('User Card could not be created.', 422, errorParse(e));
    }

  });

};
