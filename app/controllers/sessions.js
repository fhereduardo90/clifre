const sessionController = require('express').Router();
// Services
const Authenticate = require('../services/sessions/authenticate');
const AuthenticateCompany = require('../services/sessions/authenticate_company');
const AuthenticateFacebookUser = require('../services/sessions/authenticate_facebook_user');
const CreateUserFromFacebookService = require('../services/users/create_user_from_facebook');
const UpdateAvatarFromFacebookService = require('../services/users/update_avatar_from_facebook');
// Helpers
const ApiResponse = require('../helpers/api_response');
const FacebookApi = require('../helpers/facebook_api');

sessionController.route('/authenticate')
  .post((req, res) => (
    Authenticate.call(req.body.email, req.body.password)
      .then(response => (
        ApiResponse.success(res, response)
      ))
      .catch(err => (
        ApiResponse.error(res, err)
      ))
  ));

sessionController.route('/authenticate-company')
  .post((req, res) => (
    AuthenticateCompany.call(req.body.email, req.body.password)
      .then(response => (
        ApiResponse.success(res, response)
      ))
      .catch(err => (
        ApiResponse.error(res, err)
      ))
  ));

sessionController.route('/authenticate-facebook-user')
  .post((req, res) => {
    // Initialize FacebookApi instance.
    const fb = new FacebookApi(req.body.accessToken);

    return fb.me()
      .then((response) => {
        const userParams = {
          facebookId: response.id,
          name: response.name,
          email: response.email,
          avatar: response.avatar,
        };

        return AuthenticateFacebookUser.call(userParams.facebookId)
          .then((result) => {
            // Update user's avatar from facebook
            UpdateAvatarFromFacebookService.call(userParams);
            return ApiResponse.success(res, result);
          })
          .catch(() => (
            CreateUserFromFacebookService.call(userParams)
          ));
      })
      .then(response => (
        ApiResponse.success(res, response)
      ))
      .catch(err => (
        ApiResponse.error(res, err)
      ));
  });

module.exports = sessionController;
