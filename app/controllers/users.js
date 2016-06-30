// Middlewares
var userAuthenticator = require('../middlewares/user_authenticator');
// Helpers
var ApiResponse = require('../helpers/api_response');
// User Services
var CreateUserService = require('../services/users/create_user');
var UpdateUserService = require('../services/users/update_user');
var AllUsersService = require('../services/users/all_users');
// Libs
var _ = require('lodash');
// Others
var express = require('express');
var userController = new express.Router();

userController.route('/users')
  .get(function getUsers(req, res) {
    return AllUsersService.call()
      .then(function getUsersResponse(response) {
        return ApiResponse.success(res, response);
      })
      .catch(function getUsersError(err) {
        return ApiResponse.error(res, err);
      });
  })

  .post(function postUser(req, res) {
    var userParams = _.pick(req.body, ['name', 'email', 'birthdate',
      'password', 'avatar']);
    return CreateUserService.call(userParams)
      .then(function postUserResponse(response) {
        return ApiResponse.success(res, response);
      })
      .catch(function postUserError(err) {
        return ApiResponse.error(res, err);
      });
  })

  .put(userAuthenticator, function putUser(req, res) {
    var userParams = _.pick(req.body, ['name', 'email', 'birthdate',
      'password', 'avatar']);
    return UpdateUserService.call(req.user, userParams)
      .then(function putUserResponse() {
        return ApiResponse.ok(res);
      })
      .catch(function putUserError(err) {
        return ApiResponse.error(res, err);
      });
  });

userController.route('/users/profile')
  .get(userAuthenticator, function getUserProfile(req, res) {
    var attrs = ['id', 'name', 'identifier', 'email', 'birthdate', 'avatar'];
    return res.json(_.pick(req.user, attrs));
  });

module.exports = userController;
