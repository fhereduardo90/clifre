const sequelize = require('../../models');
const jwtTokenGenerator = require('./jwt_token_generator');
const app = require('../../../app');
const errorParse = require('../../helpers/error_parse');
const ApiError = require('../../errors/api_error');

module.exports.call = function(email, password) {
  return sequelize.Company.findOne({where: {email: email}})
    .then(function(company) {
      if (!company) {
        throw new Error('Authentication failed. Wrong email or password.');
      }
      return sequelize.Company.authenticate(password, company.password_hash)
        .then(function() {
          try {
            let token = jwtTokenGenerator.call(
              {identifier: company.identifier},
              app.get('jwtKey'),
              '100d'
            );
            return {
              result: {accessToken: token},
              status: 200,
              success: true,
              message: 'Company has been logged in.',
              errors: [],
            };
          } catch (e) {
            throw e;
          }
        })
        .catch(function(err) {
          throw err;
        });
    })
    .catch(function(err) {
      throw new ApiError(
        'Authentication failed. Wrong email or password.',
        400,
        errorParse(err)
      );
    });
};
