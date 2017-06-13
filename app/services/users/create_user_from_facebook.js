const sequelize = require('../../models');
const JwtTokenGenerator = require('../sessions/jwt_token_generator');
const app = require('../../../app');
const shortid = require('shortid');
const ApiError = require('../../errors/api_error');
const errorParse = require('../../helpers/error_parse');
const UserMailer = require('../../mailers/user_mailer');

module.exports.call = (params) => {
  // Generate a random identifier.
  const userParams = Object.assign({}, params, { identifier: shortid.generate().toLowerCase() });

  let token = null;

  // Create User without avatar
  return sequelize.User.create(userParams)
    .then((user) => {
      try {
        token = JwtTokenGenerator.call({ identifier: user.identifier }, app.get('jwtKey'), '100d');
      } catch (err) {
        user.destroy();
        throw err;
      }

       // Send welcome email to new user.
      UserMailer.welcomeMail(user.id);

      return {
        result: { accessToken: token },
        status: 201,
        success: true,
        message: 'User has been created.',
        errors: [],
      };
    })
    .catch((err) => {
      throw new ApiError('User could not be created.', 422, errorParse(err));
    });
};
