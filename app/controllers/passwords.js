// Middlewares
//var passwordAuthenticator = require('../middlewares/password_authenticator');
// Helpers
var ApiResponse = require('../helpers/api_response');
// Services
var ResetUserPasswordService = require('../services/users/reset_user_password');
var UpdateUserPasswordService = require('../services/users/update_user_password');
var ResetCompanyPasswordService = require('../services/companies/reset_company_password');
var UpdateCompanyPasswordService = require('../services/companies/update_company_password');
// Mailers
var UserMailer = require('../mailers/user_mailer');
var CompanyMailer = require('../mailers/company_mailer');
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
        return ApiResponse.ok(res);
      })
      .catch(function error(err) {
        return ApiResponse.error(res, err);
      });
  });

  passwordController.route('/passwords/company/reset')
    .post(function done(req, res) {
      return ResetCompanyPasswordService.call(req.body.email)
        .then(function success(response) {
          CompanyMailer.resetCompanyPassword(response.result.resetToken);
          return ApiResponse.ok(res);
        })
        .catch(function error(err) {
          return ApiResponse.error(res, err);
        });
    })

    .put(function done(req, res) {
      return UpdateCompanyPasswordService.call(
        {resetToken: req.body.resetToken, password: req.body.password}
      )
        .then(function success() {
          return ApiResponse.ok(res);
        })
        .catch(function error(err) {
          return ApiResponse.error(res, err);
        });
    });

module.exports = passwordController;
