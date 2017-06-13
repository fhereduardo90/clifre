const sequelize = require('../../models');
const jwtTokenGenerator = require('./jwt_token_generator');
const app = require('../../../app');
const errorParse = require('../../helpers/error_parse');
const ApiError = require('../../errors/api_error');

/* eslint arrow-body-style: "off" */
module.exports.call = (facebookId) => {
  // Check if an user with the same facebookId already exists.
  return sequelize.User.findOne({ where: { facebookId } })
    .then((user) => {
      if (!user) throw new Error('Authentication facebook has failed.');
      // Generate jwt token.
      const accessToken = jwtTokenGenerator.call({ identifier: user.identifier },
        app.get('jwtKey'), '100d');

      return { result: { accessToken }, status: 200 };
    })
    .catch((err) => {
      throw new ApiError('Authentication facebook has failed.', 400, errorParse(err));
    });
};
