var sessionController     = require('express').Router();
var sequelize             = require('../models');
var app                   = require('../../app');
// Services
var Authenticate          = require('../services/sessions/authenticate');
var AuthenticateCompany   = require('../services/sessions/authenticate_company');
// Helpers
var ApiResponse           = require('../helpers/api_response');

sessionController.route('/authenticate')
  .post(function (req, res) {
    return Authenticate.call(req.body.email, req.body.password)
      .then(function (response) {
        return ApiResponse.success(res, response);
      })
      .catch(function (err) {
        return ApiResponse.error(res, err);
      });
  });

  sessionController.route('/authenticate-company')
    .post(function (req, res) {
      return AuthenticateCompany.call(req.body.email, req.body.password)
        .then(function (response) {
          return ApiResponse.success(res, response);
        })
        .catch(function (err) {
          return ApiResponse.error(res, err);
        });
    });

module.exports = sessionController;
