// Middlewares
const CompanyAuthenticator = require('../middlewares/company_authenticator');
// Helpers
const ApiResponse = require('../helpers/api_response');
// Services
const CreateCompanyService = require('../services/companies/create_company');
const UpdateCompanyService = require('../services/companies/update_company');
const AllCompaniesService = require('../services/companies/all_companies');
const CompanyUsersService = require('../services/companies/company_users');
const FindCompanyService = require('../services/companies/find_company');
// Libs
const _ = require('lodash');
// Serializers
const CompanyDetailSerializer = require('../serializers/companies/company_detail');
// Others
const companyController = require('express').Router();

const getCompanyParams = (params) =>
  _.pick(params, [
    'name',
    'email',
    'about',
    'address',
    'phone',
    'password',
    'avatar',
    'facebookPage',
    'instagram',
    'web',
    'visible',
    'categoryId',
  ]);

companyController
  .route('/companies')
  .get((req, res) => {
    AllCompaniesService.call()
      .then((response) => ApiResponse.success(res, response))
      .catch((err) => ApiResponse.error(res, err));
  })

  .post((req, res) =>
    CreateCompanyService.call(getCompanyParams(req.body))
      .then((response) => ApiResponse.success(res, response))
      .catch((err) => ApiResponse.error(res, err))
  );

companyController
  .route('/companies/me')
  .get(CompanyAuthenticator, (req, res) => {
    res.json(CompanyDetailSerializer.serialize(req.company));
  })

  .put(CompanyAuthenticator, (req, res) =>
    UpdateCompanyService.call(req.company, getCompanyParams(req.body))
      .then((response) => ApiResponse.success(res, response))
      .catch((err) => ApiResponse.error(res, err))
  );

companyController
  .route('/companies/me/users')
  .get(CompanyAuthenticator, (req, res) => {
    CompanyUsersService.call(req.company)
      .then((response) => ApiResponse.success(res, response))
      .catch((err) => ApiResponse.error(res, err));
  });

companyController.route('/companies/:id').get((req, res) => {
  FindCompanyService.call(parseInt(req.params.id, 10))
    .then((response) => ApiResponse.success(res, response))
    .catch((err) => ApiResponse.error(res, err));
});

module.exports = companyController;
