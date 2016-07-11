// Middlewares
var companyAuthenticator = require('../middlewares/company_authenticator');
// Helpers
var ApiResponse = require('../helpers/api_response');
// Services
// var FindCompanyService = require('../services/companies/find_company');
var CreateCompanyService = require('../services/companies/create_company');
var UpdateCompanyService = require('../services/companies/update_company');
var AllCompaniesService = require('../services/companies/all_companies');
var CompanyUsersService = require('../services/companies/company_users');
var FindUserByIdentifierService = require('../services/companies/find_user_by_identifier');
// Libs
var _ = require('lodash');
// Others
var express = require('express');
var companyController = new express.Router();

companyController.route('/companies')
  .get(function getCompanies(req, res) {
    return AllCompaniesService.call()
      .then(function getCompaniesResponse(response) {
        return ApiResponse.success(res, response);
      })
      .catch(function getCompaniesError(err) {
        return ApiResponse.error(res, err);
      });
  })

  .post(function postCompany(req, res) {
    var companyParams = _.pick(req.body, ['name', 'email', 'about', 'address',
      'phone', 'password', 'avatar']);
    return CreateCompanyService.call(companyParams)
      .then(function postCompanyResponse(response) {
        return ApiResponse.success(res, response);
      })
      .catch(function postCompanyError(err) {
        return ApiResponse.error(res, err);
      });
  })

  .put(companyAuthenticator, function putCompany(req, res) {
    var companyParams = _.pick(req.body, ['name', 'email', 'about', 'address',
      'phone', 'password', 'avatar']);
    return UpdateCompanyService.call(req.company, companyParams)
      .then(function putCompanyResponse() {
        return ApiResponse.ok(res);
      })
      .catch(function putCompanyError(err) {
        return ApiResponse.error(res, err);
      });
  });

companyController.route('/companies/profile')
  .get(companyAuthenticator, function getCompanyProfile(req, res) {
    var attrs = ['id', 'name', 'email', 'identifier', 'about', 'address',
      'phone', 'avatar'];
    return res.json(_.pick(req.company, attrs));
  });

companyController.route('/companies/users')
  .get(companyAuthenticator, function done(req, res) {
    return CompanyUsersService.call(req.company)
      .then(function success(response) {
        return ApiResponse.success(res, response);
      }) 
      .catch(function error(err) {
        return ApiResponse.error(res, err);
      });
  });

companyController.route('/companies/users/:identifier')
  .get(companyAuthenticator, function done(req, res) {
    return FindUserByIdentifierService.call(req.company, req.params.identifier)
    .then(function success(response) {
      return ApiResponse.success(res, response);
    })
    .catch(function error(err) {
      return ApiResponse.error(res, err);
    })
  });

// companyController.route('/companies/:id')
//   .get(function (req, res) {
//     return FindCompanyService.call(req.params.id)
//       .then(function (response) {
//         return ApiResponse.success(res, response);
//       })
//       .catch(function (err) {
//         return ApiResponse.error(res, err);
//       });
//   });

module.exports = companyController;
