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
module.exports.call = (company, identifier, id) => {
  return Promise.try(() => {
    try {
      if (!_.isObject(company) || !identifier || !Number.isInteger(id)) {
        throw new Error('Parameters are incorrect.');
      }

      let userFound;

      return sequelize.User.findOne({ where: { identifier } })
        .then((user) => {
          if (!user) throw new Error('User not found.');

          userFound = user;
          return sequelize.UserCard.findOne({
            where: { companyId: company.id, userId: user.id, id },
            include: [{ model: sequelize.Card }],
          });
        })
        .then((userCard) => {
          if (!userCard) throw new Error('Card not found.');

          const relationship = {
            company: CompanyDetailSerializer.serialize(company),
            card: CardDetailSerializer.serialize(userCard.Card),
            user: UserDetailSerializer.serialize(userFound),
          };
          return {
            result: _.merge(UserCardDetailSerializer.serialize(userCard), relationship),
            status: 200,
          };
        })
        .catch((err) => {
          throw new ApiError('Cards could not be found.', 404, errorParse(err));
        });
    } catch (e) {
      throw new ApiError('User Cards could not be found.', 404, errorParse(e));
    }
  });
};
