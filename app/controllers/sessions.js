var express = require('express');
var sessionController = new express.Router();
// Services
var Authenticate = require('../services/sessions/authenticate');
var AuthenticateCompany = require('../services/sessions/authenticate_company');
var AuthenticateFacebookUser = require('../services/sessions/authenticate_facebook_user');
var CreateUserService = require('../services/users/create_user');
// Helpers
var ApiResponse = require('../helpers/api_response');
var FacebookApi = require('../helpers/facebook_api');
// Libs
var _ = require('lodash');

sessionController.route('/authenticate')
  .post(function authenticate(req, res) {
    return Authenticate.call(req.body.email, req.body.password)
      .then(function authenticateResponse(response) {
        return ApiResponse.success(res, response);
      })
      .catch(function authenticateError(err) {
        return ApiResponse.error(res, err);
      });
  });

sessionController.route('/authenticate-company')
  .post(function authenticateCompany(req, res) {
    return AuthenticateCompany.call(req.body.email, req.body.password)
      .then(function authenticateCompanyResponse(response) {
        return ApiResponse.success(res, response);
      })
      .catch(function authenticateCompanyError(err) {
        return ApiResponse.error(res, err);
      });
  });

sessionController.route('/authenticate-facebook-user')
  .post(function authenticateFacebookUser(req, res) {
    // Initialize FacebookApi instance.
    var fb = new FacebookApi(req.body.accessToken);

    return fb.me()
      .then(function success(response) {
        var userParams = {
          facebookId: response.id,
          name: response.name,
          email: response.email
        };

        return AuthenticateFacebookUser.call(userParams.facebookId)
          .then(function success(response) {
            return ApiResponse.success(res, response);
          })
          .catch(function error(err) {
            return CreateUserService.call(userParams);
          });
      })
      .then(function success(response) {
        return ApiResponse.success(res, response);
      })
      .catch(function error(err) {
        return ApiResponse.error(res, err);
      });
  })

module.exports = sessionController;
