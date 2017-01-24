const sequelize = require('../../models');
const _ = require('lodash');
const ApiError = require('../../errors/api_error');
const errorParse = require('../../helpers/error_parse');
const Promise = require('bluebird');

/* eslint arrow-body-style: "off" */
module.exports.call = (user, params) => {
  return Promise.try(() => {
    try {
      if (!params || !_.isObject(params)) throw new Error('Params are incorrect.');

      params.userId = user.id;
      return sequelize.Device.create(params)
        .then(() => ({ status: 204 }))
        .catch((err) => {
          throw new ApiError('Device could not be added', 422, errorParse(err));
        });
    } catch (e) {
      throw new ApiError('Device could not be added', 422, errorParse(e));
    }
  });
};
