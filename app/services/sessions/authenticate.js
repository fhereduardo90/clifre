var sequelize           = require('../../models');
var _                   = require('lodash');
var jwtTokenGenerator   = require('./jwt_token_generator');
var app                 = require('../../../app');
var errorParse          = require('../../helpers/error_parse');
var ApiError            = require('../../errors/api_error');

module.exports.call = function(email, password) {
  return sequelize.User.findOne({where: {email: email}})
    .then(function (user) {
      if (!user) throw new Error('Authentication failed. Wrong email or password.');
      return sequelize.User.authenticate(password, user.password)
        .then(function () {
          try {
            var token = jwtTokenGenerator.call({identifier: user.identifier},
              app.get('jwtKey'), '100d');
            return {result: {access_token: token}, status: 200, success: true,
              message: 'User has been logged in.', errors: []};
          } catch (e) {throw e;}
        })
        .catch(function (err) {throw err;});
    })
    .catch(function(err) {
      throw new ApiError('Authentication failed. Wrong email or password.',
        422, errorParse(err));
    })
};
