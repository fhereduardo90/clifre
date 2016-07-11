// Libs
var _ = require('lodash');
var Promise = require('bluebird');
// Helpers
var errorParse = require('../../helpers/error_parse');
// Others
var ApiError = require('../../errors/api_error');
var sequelize= require('../../models');

module.exports.call = function(company) {
  return new Promise.try(function promise() {
    try {
      if (!company || !_.isObject(company)) throw new Error('Parameters are not correct.');
      // TODO: try to by this raw query sequelize properties
      var sql = 'SELECT DISTINCT u.id, u.name, u.email, u.identifier, \
      u.birthdate, u.avatar from users as u LEFT JOIN user_cards \
      on u.id = user_cards.user_id WHERE user_cards.company_id = ?';
      return sequelize.sequelize.query(sql, {model: sequelize.User, replacements: [company.id]})
        .then(function success(users) {
          if (!users) throw new Error('Users not found.');
          // TODO: do not include isPasswordEncrypted from user model
          return {result: users.map(function map(user) {
            return _.pick(user, ['id', 'name', 'email', 'identifier', 'birthdate', 'avatar']);
          }), status: 200};
        })
        .catch(function error(err) {
          throw new ApiError('Company could not be found.', 422, errorParse(err));
        });
    } catch (e) {
      throw new ApiError('Company could not be found.', 422, errorParse(e));
    }
  });
};
