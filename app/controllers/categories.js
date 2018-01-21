// Middlewares
const CompanyAuthenticator = require('../middlewares/company_authenticator');
// Helpers
const ApiResponse = require('../helpers/api_response');
// Services
const AllCategoriesService = require('../services/categories/all_categories');
const FindCategoryService = require('../services/categories/find_category');
const categoryController = require('express').Router();

categoryController.route('/categories').get(CompanyAuthenticator, (req, res) => {
  AllCategoriesService.call()
    .then(response => ApiResponse.success(res, response))
    .catch(err => ApiResponse.error(res, err));
});

categoryController.route('/categories/:id').get(CompanyAuthenticator, (req, res) => {
  FindCategoryService.call(parseInt(req.params.id, 10))
    .then(response => ApiResponse.success(res, response))
    .catch(err => ApiResponse.error(res, err));
});

module.exports = categoryController;
