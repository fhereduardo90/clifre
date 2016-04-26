var cardController          = require('express').Router();
var sequelize               = require('../models');
// Middlewares
var companyAuthenticator    = require('../middlewares/company_authenticator');
// Helpers
var ApiResponse             = require('../helpers/api_response');
// Services
var FindCardService         = require('../services/cards/find_card');
var CreateCardService       = require('../services/cards/create_card');
var AllCardsService         = require('../services/cards/all_cards');
var UpdateCardService       = require('../services/cards/update_card');

cardController.route('/companies/cards')
  .get(companyAuthenticator, function (req, res) {
    return AllCardsService.call(req.company)
      .then(function (response) {
        return ApiResponse.success(res, response);
      })
      .catch(function (err) {
        return ApiResponse.error(res, err);
      });
  })

  .post(companyAuthenticator, function (req, res) {
    var cardParams = {
      title:          req.body.title,
      stamps:         req.body.stamps,
      description:    req.body.description,
      color:          req.body.color
    };

    return CreateCardService.call(req.company, cardParams)
      .then(function (response) {
        return ApiResponse.success(res, response);
      })
      .catch(function (err) {
        return ApiResponse.error(res, err);
      });
  })

cardController.route('/companies/cards/:id')
  .get(companyAuthenticator, function (req, res) {
    return FindCardService.call(req.company, req.params)
      .then(function (response) {
        return ApiResponse.success(res, response);
      })
      .catch(function (err) {
        return ApiResponse.error(res, err);
      });
  })

  .put(companyAuthenticator, function (req, res) {
    var cardParams = {
      title:          req.body.title,
      stamps:         req.body.stamps,
      description:    req.body.description,
      color:          req.body.color
    };
    cardParams.id = req.params.id;

    return UpdateCardService.call(req.company, cardParams)
      .then(function (response) {
        return ApiResponse.success(res, response);
      })
      .catch(function (err) {
        return ApiResponse.error(res, err);
      });
  });

module.exports = cardController;
