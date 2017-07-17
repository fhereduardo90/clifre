const featuredCompanyController = require('express').Router();
// Middlewares
const CompanyAuthenticator = require('../middlewares/company_authenticator');
// Helpers
const ApiResponse = require('../helpers/api_response');
// Services
const AllFeaturedCompanies = require('../services/featured_companies/all_featured_companies');
const CreateFeaturedCompany = require('../services/featured_companies/create_featured_company');

featuredCompanyController.route('/featured-companies')
  .get((req, res) => (
    AllFeaturedCompanies.call()
      .then(response => ApiResponse.success(res, response))
      .catch(err => ApiResponse.error(res, err))
  ))
  .post(CompanyAuthenticator, (req, res) => {
    const params = {
      companyId: req.body.company_id,
      image: req.body.image,
    };

    CreateFeaturedCompany.call(params)
      .then(response => ApiResponse.success(res, response))
      .catch(err => ApiResponse.error(res, err));
  });

module.exports = featuredCompanyController;
