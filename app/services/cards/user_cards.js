// Libs
const _ = require('lodash');
const Promise = require('bluebird');
// Helpers
const errorParse = require('../../helpers/error_parse');
// Serializers
const UserCardDetailSerializer = require('../../serializers/user_cards/user_card_detail');
const CardDetailSerializer = require('../../serializers/cards/card_detail');
const UserDetailSerializer = require('../../serializers/users/user_detail');
const CompanyDetailSerializer = require('../../serializers/companies/company_detail');
// Others
const ApiError = require('../../errors/api_error');
const sequelize = require('../../models');

/* eslint arrow-body-style: "off" */
module.exports.call = (company, identifier) => {
  return Promise.try(() => {
    try {
      if (!_.isObject(company) || !identifier) {
        throw new Error('Parameters are incorrect.');
      }

      let userFound;

      return sequelize.User.findOne({ where: { identifier } })
        .then((user) => {
          if (!user) throw new Error('User not found.');

          userFound = user;
          return sequelize.UserCard.findAll({
            where: { companyId: company.id, userId: user.id },
            include: [{ model: sequelize.Card }],
          });
        })
        .then((userCards) => {
          const result = userCards.map((userCard) => {
            return _.merge(
              UserCardDetailSerializer.serialize(userCard),
              {
                card: CardDetailSerializer.serialize(userCard.Card),
                user: UserDetailSerializer.serialize(userFound),
                company: CompanyDetailSerializer.serialize(company),
              }
            );
          });

          return { result, status: 200 };
        })
        .catch((err) => {
          throw new ApiError('Cards could not be found.', 422, errorParse(err));
        });
    } catch (e) {
      throw new ApiError('User Cards could not be found.', 422, errorParse(e));
    }
  });
};
