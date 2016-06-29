// Middlewares
//var passwordAuthenticator = require('../middlewares/password_authenticator');
// Helpers
var ApiResponse = require('../helpers/api_response');
// User Services
var ResetUserPasswordService = require('../services/users/reset_user_password');
var UpdateUserPasswordService = require('../services/users/update_user_password');
// Mailers
var UserMailer = require('../mailers/user_mailer');
// Others
var express = require('express');
var passwordController = new express.Router();

passwordController.route('/passwords/user/reset')
  .post(function done(req, res) {
    return ResetUserPasswordService.call(req.body.email)
      .then(function success(response) {
        UserMailer.resetUserPassword(response.result.resetToken);
        return ApiResponse.ok(res);
      })
      .catch(function error(err) {
        return ApiResponse.error(res, err);
      });
  })

  .put(function done(req, res) {
    return UpdateUserPasswordService.call(
      {resetToken: req.body.resetToken, password: req.body.password}
    )
      .then(function success(response) {
        //UserMailer.resetUserPassword(response.result.resetToken);
        return ApiResponse.ok(res);
      })
      .catch(function error(err) {
        return ApiResponse.error(res, err);
      });
  })


module.exports = passwordController;
