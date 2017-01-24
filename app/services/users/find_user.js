const sequelize = require('../../models');
const _ = require('lodash');
const ApiError = require('../../errors/api_error');
const errorParse = require('../../helpers/error_parse');
const Promise = require('bluebird');
const UserDetailSerializer = require('../../serializers/users/user_detail');

/* eslint arrow-body-style: "off" */
module.exports.call = (params) => {
  return Promise.try(() => {
    try {
      if (!params || !_.isObject(params)) throw new Error('Params are incorrect.');
      return sequelize.User.findOne({ where: params })
        .then((user) => {
          if (!user) throw new Error('User not found.');
          return { result: UserDetailSerializer.serialize(user), status: 200 };
        })
        .catch((err) => {
          throw new ApiError('User not found.', 422, errorParse(err));
        });
    } catch (e) {
      throw new ApiError('User not found.', 422, errorParse(e));
    }
  });
};
