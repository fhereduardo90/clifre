// Libs
const _ = require('lodash');
const Promise = require('bluebird');
// Helpers
const errorParse = require('../../helpers/error_parse');
// Serializers
const UserCardDetailSerializer = require('../../serializers/user_cards/user_card_detail');
const CompanyDetailSerializer = require('../../serializers/companies/company_detail');
const CardDetailSerializer = require('../../serializers/cards/card_detail');
const UserDetailSerializer = require('../../serializers/users/user_detail');
// Others
const ApiError = require('../../errors/api_error');
const sequelize = require('../../models');

/* eslint arrow-body-style: "off" */
module.exports.call = (company, identifier, cardId) => {
  return Promise.try(() => {
    try {
      if (!_.isObject(company) || !identifier || !Number.isInteger(cardId)) {
        throw new Error('Parameters are incorrect.');
      }

      let cardFound;
      let userFound;

      return sequelize.Card.findOne({ where: { companyId: company.id, id: cardId } })
        .then((card) => {
          if (!card) throw new Error('Card not found.');
          cardFound = card;
          return sequelize.User.findOne({ where: { identifier } });
        })
        .then((user) => {
          if (!user) throw new Error('User not found');
          userFound = user;
          const params = { companyId: company.id, sealedDates: [], cardId, userId: user.id };
          return sequelize.UserCard.create(params);
        })
        .then((userCard) => {
          if (!userCard) throw new Error('Card could not be created');

          const relationship = {
            company: CompanyDetailSerializer.serialize(company),
            card: CardDetailSerializer.serialize(cardFound),
            user: UserDetailSerializer.serialize(userFound),
          };
          return {
            result: _.merge(UserCardDetailSerializer.serialize(userCard), relationship),
            status: 201,
          };
        })
        .catch((err) => {
          throw new ApiError('User Card could not be created.', 422, errorParse(err));
        });
    } catch (e) {
      throw new ApiError('User Card could not be created.', 422, errorParse(e));
    }
  });
};
