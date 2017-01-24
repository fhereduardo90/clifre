// Middlewares
const CompanyAuthenticator = require('../middlewares/company_authenticator');
// Helpers
const ApiResponse = require('../helpers/api_response');
// Services
const CreateCompanyService = require('../services/companies/create_company');
const UpdateCompanyService = require('../services/companies/update_company');
const AllCompaniesService = require('../services/companies/all_companies');
const CompanyUsersService = require('../services/companies/company_users');
const FindUserService = require('../services/companies/find_user');
const FindCompanyService = require('../services/companies/find_company');
// Libs
const _ = require('lodash');
// Serializers
const CompanyDetailSerializer = require('../serializers/companies/company_detail');
// Others
const companyController = require('express').Router();

companyController.route('/companies')
  .get((req, res) => {
    AllCompaniesService.call()
      .then(response => ApiResponse.success(res, response))
      .catch(err => ApiResponse.error(res, err));
  })

  .post((req, res) => {
    const companyParams = _.pick(req.body, ['name', 'email', 'about', 'address',
      'phone', 'password', 'avatar']);
    return CreateCompanyService.call(companyParams)
      .then(response => ApiResponse.success(res, response))
      .catch(err => ApiResponse.error(res, err));
  });

companyController.route('/companies/me')
  .get(CompanyAuthenticator, (req, res) => {
    res.json(CompanyDetailSerializer.serialize(req.company));
  })

  .put(CompanyAuthenticator, (req, res) => {
    const companyParams = _.pick(req.body, ['name', 'email', 'about', 'address',
      'phone', 'password', 'avatar']);
    return UpdateCompanyService.call(req.company, companyParams)
      .then(() => ApiResponse.ok(res))
      .catch(err => ApiResponse.error(res, err));
  });

companyController.route('/companies/me/users')
  .get(CompanyAuthenticator, (req, res) => {
    CompanyUsersService.call(req.company)
      .then(response => ApiResponse.success(res, response))
      .catch(err => ApiResponse.error(res, err));
  });

// companyController.route('/companies/me/users/:id')
//   .get(CompanyAuthenticator, (req, res) => {
//     FindUserService.call(req.company, req.params.id)
//       .then(response => ApiResponse.success(res, response))
//       .catch(err => ApiResponse.error(res, err));
//   });

companyController.route('/companies/:id')
  .get((req, res) => {
    FindCompanyService.call(parseInt(req.params.id, 10))
      .then(response => ApiResponse.success(res, response))
      .catch(err => ApiResponse.error(res, err));
  });

module.exports = companyController;
