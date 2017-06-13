const sequelize = require('../../models');
const ApiError = require('../../errors/api_error');
const errorParse = require('../../helpers/error_parse');

module.exports.call = ({ facebookId, avatar }) => (
  sequelize.User.update({ avatar }, { where: { facebookId } })
    .then(user => ({
      result: { user },
      status: 200,
      success: true,
      message: 'User has been updated.',
      errors: [],
    }))
    .catch((err) => {
      throw new ApiError('User could not be updated.', 422, errorParse(err));
    })
);

