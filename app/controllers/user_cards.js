var express = require('express');
var userCardController = new express.Router();
// Middlewares
var companyAuthenticator = require('../middlewares/company_authenticator');
var userAuthenticator = require('../middlewares/user_authenticator');
// Helpers
var ApiResponse = require('../helpers/api_response');
// Services
var UserCardsByCompanyService = require('../services/user_cards/user_cards_by_company');
var CreateUserCardByCompanyService = require('../services/user_cards/create_user_card_by_company');
var AddStampByCompanyService = require('../services/user_cards/add_stamp_by_company');
var RemoveStampByCompanyService = require('../services/user_cards/remove_stamp_by_company');
var FindUserCardByCompanyService = require('../services/user_cards/find_user_card_by_company');
var DeleteUserCardService = require('../services/user_cards/delete_user_card');
var UserCardsService = require('../services/user_cards/user_cards_by_user');
var FindUserCardByUserService = require('../services/user_cards/find_user_card_by_user');

/*******************************************************************************
******************************* USER ENDPOINTS *********************************
*******************************************************************************/

userCardController.route('/users/me/user-cards')
  .get(userAuthenticator, function done(req, res) {
    return UserCardsService.call(req.user)
      .then(function success(response) {
        return ApiResponse.success(res, response);
      })
      .catch(function error(err) {
        return ApiResponse.error(res, err);
      });
  });

  userCardController.route('/users/me/user-cards/:id')
    .get(userAuthenticator, function done(req, res) {
      return FindUserCardByUserService.call(req.user, parseInt(req.params.id))
        .then(function success(response) {
          return ApiResponse.success(res, response);
        })
        .catch(function error(err) {
          return ApiResponse.error(res, err);
        });
    });

/*******************************************************************************
**************************** COMPANY ENDPOINTS *********************************
*******************************************************************************/

userCardController.route('/users/:userId/user-cards')
  .get(companyAuthenticator, function done(req, res) {
    return UserCardsByCompanyService.call(req.company, parseInt(req.params.userId))
      .then(function success(response) {
        return ApiResponse.success(res, response);
      })
      .catch(function error(err) {
        return ApiResponse.error(res, err);
      });
  })
  .post(companyAuthenticator, function done(req, res) {
    var params = {
      userId: parseInt(req.params.userId),
      cardId: parseInt(req.body.cardId)
    }
    return CreateUserCardByCompanyService.call(req.company, params)
      .then(function success(response) {
        return ApiResponse.success(res, response);
      })
      .catch(function error(err) {
        return ApiResponse.error(res, err);
      });
  });

userCardController.route('/users/:userId/user-cards/:id/add-stamp')
  .put(companyAuthenticator, function done(req, res) {
    return AddStampByCompanyService.call(req.company, parseInt(req.params.userId), parseInt(req.params.id))
      .then(function success() {
        return ApiResponse.ok(res);
      })
      .catch(function error(err) {
        return ApiResponse.error(res, err);
      });
  });

userCardController.route('/users/:userId/user-cards/:id/remove-stamp')
  .put(companyAuthenticator, function done(req, res) {
    return RemoveStampByCompanyService.call(req.company, parseInt(req.params.userId), parseInt(req.params.id))
      .then(function success() {
        return ApiResponse.ok(res);
      })
      .catch(function error(err) {
        return ApiResponse.error(res, err);
      });
  });

userCardController.route('/users/:userId/user-cards/:id')
  .get(companyAuthenticator, function done(req, res) {
    return FindUserCardByCompanyService.call(req.company, parseInt(req.params.userId), parseInt(req.params.id))
      .then(function success(response) {
        return ApiResponse.success(res, response);
      })
      .catch(function error(err) {
        return ApiResponse.error(res, err);
      });
  })
  .delete(companyAuthenticator, function done(req, res) {
    return DeleteUserCardService.call(req.company, parseInt(req.params.userId), parseInt(req.params.id))
      .then(function success() {
        return ApiResponse.ok(res);
      })
      .catch(function error(err) {
        return ApiResponse.error(res, err);
      });
  })

module.exports = userCardController;
