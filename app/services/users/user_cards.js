// Libs
const _ = require('lodash');
const Promise = require('bluebird');
// Helpers
const errorParse = require('../../helpers/error_parse');
// Serializers
const UserCardDetailSerializer = require('../../serializers/user_cards/user_card_detail');
const CardDetailSerializer = require('../../serializers/cards/card_detail');
const CompanyDetailSerializer = require('../../serializers/companies/company_detail');
// Others
const ApiError = require('../../errors/api_error');
const sequelize = require('../../models');

/* eslint arrow-body-style: "off" */
module.exports.call = (user) => {
  return Promise.try(() => {
    try {
      if (!_.isObject(user)) {
        throw new Error('Parameters are incorrect.');
      }

      return user.getUserCards({
        include: [{ model: sequelize.Card }, { model: sequelize.Company }],
      })
      .then((userCards) => {
        const result = userCards.map((userCard) => {
          return _.merge(
            UserCardDetailSerializer.serialize(userCard),
            {
              card: CardDetailSerializer.serialize(userCard.Card),
              company: CompanyDetailSerializer.serialize(userCard.Company),
            }
          );
        });

        return { result, status: 200 };
      })
      .catch((err) => {
        throw new ApiError('User Error.', 422, errorParse(err));
      });
    } catch (e) {
      throw new ApiError('User Error.', 422, errorParse(e));
    }
  });
};
