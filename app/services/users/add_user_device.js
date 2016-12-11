var sequelize = require('../../models');
var _ = require('lodash');
var ApiError = require('../../errors/api_error');
var errorParse = require('../../helpers/error_parse');
var Promise = require('bluebird');

module.exports.call = function (user, params) {
  return Promise.try(function addUserDevice() {
    try {
      if (!params || !_.isObject(params)) throw new Error('Params are not correct.');
      params.userId = user.id;
      return sequelize.Device.create(params)
        .then(function success() {
          return {status: 204};
        })
        .catch(function error(err) {
          throw new ApiError('Device could not be added', 422, errorParse(err));
        })
    } catch (e) {
      throw new ApiError('Device could not be added', 422, errorParse(e));
    }
  });
};
