var sequelize = require('../../models');
var jwtTokenGenerator = require('./jwt_token_generator');
var app = require('../../../app');
var errorParse = require('../../helpers/error_parse');
var ApiError = require('../../errors/api_error');

module.exports.call = function(facebookId) {
  // Check if an user with the same facebookId already exists.
  return sequelize.User.findOne({where: {facebookId: facebookId}})
    .then(function success(user) {
      if (!user) throw new Error('Authentication facebook Failed.');
      // Generate jwt token.
      var token = jwtTokenGenerator.call({identifier: user.identifier},
        app.get('jwtKey'), '100d');
      return {result: {accessToken: token}, status: 200, success: true,
        message: 'User has been logged in.', errors: []};
    })
    .catch(function error(err) {
      throw new ApiError('Authentication facebook failed.', 422, errorParse(err));
    })
};
