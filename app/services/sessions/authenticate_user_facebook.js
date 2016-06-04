var sequelize           = require('../../models');
var _                   = require('lodash');
var jwtTokenGenerator   = require('./jwt_token_generator');
var app                 = require('../../../app');
var errorParse          = require('../../helpers/error_parse');
var ApiError            = require('../../errors/api_error');

module.exports.call = function(facebookId) {
  return sequelize.User.findOne({where: {facebookId: facebookId}})
    .then(function (user) {
      if (!user) throw new Error('Authentication failed.');
      var token = jwtTokenGenerator.call({identifier: user.identifier},
        app.get('jwtKey'), '100d');
      return {result: {access_token: token}, status: 200, success: true,
        message: 'User has been logged in.', errors: []};
    })
    .catch(function(err) {
      throw new ApiError('Authentication failed.',
        422, errorParse(err));
    })
};
