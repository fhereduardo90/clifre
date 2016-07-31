// Libs
var _ = require('lodash');
var Promise = require('bluebird');
// Helpers
var errorParse = require('../../helpers/error_parse');
// Others
var ApiError = require('../../errors/api_error');
var sequelize= require('../../models');

module.exports.call = function(company, id) {
  return new Promise.try(function promise() {
    try {
      if (!company || !_.isObject(company) || !id) {
        throw new Error('Parameters are not correct.');
      }
      // TODO: try to by this raw query sequelize properties
      var sql = 'SELECT u.id, u.name, u.email, u.identifier, \
      u.birthdate, u.avatar from users as u LEFT JOIN user_cards as uc \
      on u.id = uc.user_id WHERE uc.company_id = ? \
      and u.id = ? LIMIT 1';
      return sequelize.sequelize.query(sql, {model: sequelize.User, replacements: [company.id, id]})
        .then(function success(users) {
          if (!users || !users.length) throw new Error('User not found.');
          // TODO: do not include isPasswordEncrypted from user model
          return {result: _.pick(users[0], ['id', 'name', 'email', 'identifier',
            'birthdate', 'avatar']), status: 200};
        })
        .catch(function error(err) {
          throw new ApiError('Company could not be found.', 422, errorParse(err));
        });
    } catch (e) {
      throw new ApiError('Company could not be found.', 422, errorParse(e));
    }
  });
};
