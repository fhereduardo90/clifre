var sequelize = require('../../models');
var ApiError = require('../../errors/api_error');
var errorParse = require('../../helpers/error_parse');
var Promise = require('bluebird');
var bcrypt = require('bcryptjs');

module.exports.call = function (email) {
  return Promise.try(function findUser() {
    try {
      if (!email) throw new Error('Params are not correct.');
      return sequelize.User.findOne({where: {email: email}, attributes: ['id']})
        .then(function success(user) {
          if (!user) throw new Error('User not found.');
          user.resetPasswordToken = bcrypt.genSaltSync(15);
          user.resetPasswordExpires = Date.now() + 86400000; // 1 day.
          return user.save();
        })
        .then(function success(user) {
          return {result: {resetToken: user.resetPasswordToken}, status: 200};
        })
        .catch(function error(err) {
          throw new ApiError('User not found.', 422, errorParse(err));
        });
    } catch (e) {
      throw new ApiError('User not found.', 422, errorParse(e));
    }
  });
};
