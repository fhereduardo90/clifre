var express = require('express');
var sessionController = new express.Router();
// Services
var Authenticate = require('../services/sessions/authenticate');
var AuthenticateCompany = require('../services/sessions/authenticate_company');
// Helpers
var ApiResponse = require('../helpers/api_response');

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

module.exports = sessionController;
