var express = require('express');
var sessionController = new express.Router();
// Services
var Authenticate = require('../services/sessions/authenticate');
var AuthenticateCompany = require('../services/sessions/authenticate_company');
var AuthenticateUserFacebook = require('../services/sessions/authenticate_user_facebook');
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
  .post(function authenticateUserFacebook(req, res) {
    var fb = new FacebookApi(req.body.accessToken);
    return fb.me()
      .then(function meResponse(response) {
        var userParams = {
          facebookId: response.id,
          name: response.name,
          email: response.email
        };

        return AuthenticateUserFacebook.call(userParams.facebookId)
          .then(function facebookResponse(response) {
            return ApiResponse.success(res, response);
          })
          .catch(function facebookError(err) {
            return CreateUserService.call(userParams);
          });
      })
      .then(function postUserResponse(response) {
        return ApiResponse.success(res, response);
      })
      .catch(function postUserError(err) {
        return ApiResponse.error(res, err);
      });
  })

module.exports = sessionController;
