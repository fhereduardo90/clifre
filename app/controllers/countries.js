const ApiResponse = require('../helpers/api_response');
const AllCountriesService = require('../services/countries/all_countries');
const FindCountryService = require('../services/countries/find_country');
const countryController = require('express').Router();

countryController.route('/countries').get((req, res) => {
  AllCountriesService.call()
    .then(response => ApiResponse.success(res, response))
    .catch(err => ApiResponse.error(res, err));
});

countryController.route('/countries/:id').get((req, res) => {
  FindCountryService.call(parseInt(req.params.id, 10))
    .then(response => ApiResponse.success(res, response))
    .catch(err => ApiResponse.error(res, err));
});

module.exports = countryController;
