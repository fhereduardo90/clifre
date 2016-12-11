var sequelize = require('../../models');
var ApiError = require('../../errors/api_error');
var errorParse = require('../../helpers/error_parse');
var Promise = require('bluebird');
var bcrypt = require('bcryptjs');
var _ = require('lodash');

module.exports.call = function (params) {
  return Promise.try(function findUser() {
    try {
      if (!params || !_.isObject(params)) throw new Error('Params are not correct.');
      return sequelize.User.findOne(
        {where: {resetPasswordToken: params.resetToken}, attributes: ['id', 'resetPasswordExpires']}
      )
        .then(function success(user) {
          if (!user) throw new Error('User not found.');
          if (user.resetPasswordExpires < Date.now()) throw new Error('Reset Token has expired.');
          user.password = params.password;
          user.resetPasswordToken = bcrypt.genSaltSync(15);
          user.resetPasswordExpires = Date.now(); // 1 day.
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
