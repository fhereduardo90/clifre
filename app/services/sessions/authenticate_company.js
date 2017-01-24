var sequelize           = require('../../models');
var _                   = require('lodash');
var jwtTokenGenerator   = require('./jwt_token_generator');
var app                 = require('../../../app');
var errorParse          = require('../../helpers/error_parse');
var ApiError            = require('../../errors/api_error');

module.exports.call = function(email, password) {
  return sequelize.Company.findOne({where: {email: email}})
    .then(function (company) {
      if (!company) throw new Error('Authentication failed. Wrong email or password.');
      return sequelize.Company.authenticate(password, company.password)
        .then(function () {
          try {
            var token = jwtTokenGenerator.call({identifier: company.identifier},
              app.get('jwtKey'), '100d');
            return {result: {accessToken: token}, status: 200, success: true,
              message: 'Company has been logged in.', errors: []};
          } catch (e) {throw e;}
        })
        .catch(function (err) {throw err;});
    })
    .catch(function(err) {
      throw new ApiError('Authentication failed. Wrong email or password.',
        400, errorParse(err));
    })
};
