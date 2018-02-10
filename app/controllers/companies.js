const pick = require('lodash/pick');
const companyController = require('express').Router();
const ApiResponse = require('../helpers/api_response');
const CompanyAuthenticator = require('../middlewares/company_authenticator');
const CreateCompanyService = require('../services/companies/create_company');
const UpdateCompanyService = require('../services/companies/update_company');
const AllCompaniesService = require('../services/companies/all_companies');
const CompanyUsersService = require('../services/companies/company_users');
const FindCompanyService = require('../services/companies/find_company');
const CompanyDetailSerializer = require('../serializers/companies/company_detail');
const CategoryDetailSerializer = require('../serializers/categories/category_detail');
const CountryDetailSerializer = require('../serializers/countries/country_detail');

const getCompanyParams = params =>
  pick(params, [
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
    'countryId',
  ]);

companyController
  .route('/companies')
  .get((req, res) => {
    AllCompaniesService.call()
      .then(response => ApiResponse.success(res, response))
      .catch(err => ApiResponse.error(res, err));
  })
  .post((req, res) =>
    CreateCompanyService.call(getCompanyParams(req.body))
      .then(response => ApiResponse.success(res, response))
      .catch(err => ApiResponse.error(res, err)));

companyController
  .route('/companies/me')
  .get(CompanyAuthenticator, (req, res) => {
    res.json({
      ...CompanyDetailSerializer.serialize(req.company),
      ...(req.company.Category
        ? { category: CategoryDetailSerializer.serialize(req.company.Category) }
        : {}),
      ...(req.company.Category
        ? { category: CategoryDetailSerializer.serialize(req.company.Category) }
        : {}),
      ...(req.company.Country
        ? { country: CountryDetailSerializer.serialize(req.company.Country) }
        : {}),
    });
  })

  .put(CompanyAuthenticator, (req, res) =>
    UpdateCompanyService.call(req.company, getCompanyParams(req.body))
      .then(response => ApiResponse.success(res, response))
      .catch(err => ApiResponse.error(res, err)));

companyController.route('/companies/me/users').get(CompanyAuthenticator, (req, res) => {
  CompanyUsersService.call(req.company)
    .then(response => ApiResponse.success(res, response))
    .catch(err => ApiResponse.error(res, err));
});

companyController.route('/companies/:id').get((req, res) => {
  FindCompanyService.call(parseInt(req.params.id, 10))
    .then(response => ApiResponse.success(res, response))
    .catch(err => ApiResponse.error(res, err));
});

module.exports = companyController;
