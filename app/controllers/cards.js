var express = require('express');
var cardController = new express.Router();
// Middlewares
var companyAuthenticator = require('../middlewares/company_authenticator');
// Helpers
var ApiResponse = require('../helpers/api_response');
// Services
var FindCardService = require('../services/cards/find_card');
var CreateCardService = require('../services/cards/create_card');
var AllCardsService = require('../services/cards/all_cards');
var UpdateCardService = require('../services/cards/update_card');

cardController.route('/companies/me/cards')
  .get(companyAuthenticator, function getCards(req, res) {
    return AllCardsService.call(req.company)
      .then(function getCardsResponse(response) {
        return ApiResponse.success(res, response);
      })
      .catch(function getCardsError(err) {
        return ApiResponse.error(res, err);
      });
  })

  .post(companyAuthenticator, function postCard(req, res) {
    var cardParams = {
      title: req.body.title,
      stamps: req.body.stamps,
      description: req.body.description,
      color: req.body.color
    };

    return CreateCardService.call(req.company, cardParams)
      .then(function postCardResponse(response) {
        return ApiResponse.success(res, response);
      })
      .catch(function postCardError(err) {
        return ApiResponse.error(res, err);
      });
  });

cardController.route('/companies/me/cards/:id')
  .get(companyAuthenticator, function getCard(req, res) {
    return FindCardService.call(req.company, req.params)
      .then(function getCardResponse(response) {
        return ApiResponse.success(res, response);
      })
      .catch(function getCardError(err) {
        return ApiResponse.error(res, err);
      });
  })

  .put(companyAuthenticator, function putCompany(req, res) {
    var cardParams = {
      title: req.body.title,
      stamps: req.body.stamps,
      description: req.body.description,
      color: req.body.color,
      id: req.params.id
    };

    return UpdateCardService.call(req.company, cardParams)
      .then(function putCardResponse() {
        return ApiResponse.ok(res);
      })
      .catch(function putCardError(err) {
        return ApiResponse.error(res, err);
      });
  });

module.exports = cardController;
