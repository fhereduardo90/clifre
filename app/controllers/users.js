// Middlewares
const UserAuthenticator = require('../middlewares/user_authenticator');
// Helpers
const ApiResponse = require('../helpers/api_response');
// User Services
const CreateUserService = require('../services/users/create_user');
const UpdateUserService = require('../services/users/update_user');
const AllUsersService = require('../services/users/all_users');
const FindUserService = require('../services/users/find_user');
const AddUserDevice = require('../services/users/add_user_device');
const UserCardsService = require('../services/users/user_cards');
const FindUserCardService = require('../services/users/find_user_card');
// Libs
const _ = require('lodash');
// Serializers
const UserDetailSerializer = require('../serializers/users/user_detail');
// Others
const userController = require('express').Router();

userController.route('/users')
  .get((req, res) => {
    AllUsersService.call()
      .then(response => ApiResponse.success(res, response))
      .catch(err => ApiResponse.error(res, err));
  })

  .post((req, res) => {
    const userParams = _.pick(req.body, ['name', 'email', 'birthdate',
      'password', 'avatar']);
    return CreateUserService.call(userParams)
      .then(response => ApiResponse.success(res, response))
      .catch(err => ApiResponse.error(res, err));
  });

userController.route('/users/me')
  .get(UserAuthenticator, (req, res) => {
    res.json(UserDetailSerializer.serialize(req.user));
  })

  .put(UserAuthenticator, (req, res) => {
    const userParams = _.pick(req.body, ['name', 'email', 'birthdate',
      'password', 'avatar']);
    return UpdateUserService.call(req.user, userParams)
      .then(() => ApiResponse.ok(res))
      .catch(err => ApiResponse.error(res, err));
  });

userController.route('/users/:identifier')
  .get((req, res) => {
    FindUserService.call({ identifier: req.params.identifier })
      .then(response => ApiResponse.success(res, response))
      .catch(err => ApiResponse.error(res, err));
  });

userController.route('/users/me/device')
  .post(UserAuthenticator, (req, res) => {
    AddUserDevice.call(req.user, {
      registrationId: req.body.registrationId,
      platform: req.body.platform,
    })
      .then(response => ApiResponse.success(res, response))
      .catch(err => ApiResponse.error(res, err));
  });

/* **************** CARDS ENDPOINTS **************** */

userController.route('/users/me/cards')
  .get(UserAuthenticator, (req, res) => {
    UserCardsService.call(req.user)
      .then(response => ApiResponse.success(res, response))
      .catch(err => ApiResponse.error(res, err));
  });

userController.route('/users/me/cards/:id')
  .get(UserAuthenticator, (req, res) => {
    FindUserCardService.call(req.user, parseInt(req.params.id, 10))
      .then(response => ApiResponse.success(res, response))
      .catch(err => ApiResponse.error(res, err));
  });

module.exports = userController;
