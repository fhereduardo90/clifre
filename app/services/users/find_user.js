var sequelize = require('../../models');
var _ = require('lodash');
var ApiError = require('../../errors/api_error');
var errorParse = require('../../helpers/error_parse');
var Promise = require('bluebird');

module.exports.call = function (params) {
  return Promise.try(function findUser() {
    try {
      if (!params || !_.isObject(params)) throw new Error('Params are not correct.');
      return sequelize.User.findOne(
        {where: params, attributes: ['id', 'name', 'email', 'identifier',
          'birthdate', 'avatar']}
      )
        .then(function (user) {
          if (!user) throw new Error('User not found.')
          var params = ['id', 'name', 'email', 'identifier',
            'birthdate', 'avatar'];
          return {result: _.pick(user, params), status: 200};
        })
        .catch(function error(err) {
          throw new ApiError('User not found.', 422, errorParse(err));
        });
    } catch (e) {
      throw new ApiError('User not found.', 422, errorParse(e));
    }
  });
};
