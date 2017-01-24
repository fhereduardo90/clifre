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
module.exports.call = (user, id) => {
  return Promise.try(() => {
    try {
      if (!_.isObject(user) || !id || !Number.isInteger(id)) {
        throw new Error('Parameters are incorrect.');
      }

      return user.getUserCards({
        where: { id },
        include: [{ model: sequelize.Card }, { model: sequelize.Company }],
      })
      .then((userCards) => {
        if (userCards.length === 0) throw new Error('Card not found');

        const relationship = {
          company: CompanyDetailSerializer.serialize(userCards[0].Company),
          card: CardDetailSerializer.serialize(userCards[0].Card),
        };

        return {
          result: _.merge(UserCardDetailSerializer.serialize(userCards[0]), relationship),
          status: 200,
        };
      })
      .catch((err) => {
        throw new ApiError('User Error.', 404, errorParse(err));
      });
    } catch (e) {
      throw new ApiError('User Error.', 404, errorParse(e));
    }
  });
};
