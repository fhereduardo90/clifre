// Libs
const Promise = require('bluebird');
const _ = require('lodash');
// Helpers
const errorParse = require('../../helpers/error_parse');
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

      return sequelize.User.findOne({ where: { identifier } })
        .then((user) => {
          if (!user) throw new Error('User not found.');

          return sequelize.UserCard.destroy({
            where: { companyId: company.id, userId: user.id, id },
          });
        })
        .then((userCards) => {
          if (userCards === 0) throw new Error('Card not found.');

          return {
            result: null,
            status: 204,
          };
        })
        .catch((err) => {
          throw new ApiError('Card could not be deleted.', 404, errorParse(err));
        });
    } catch (e) {
      throw new ApiError('Card could not be deleted.', 422, errorParse(e));
    }
  });
};
