var userController      = require('express').Router();
var sequelize           = require('../models');
var CreateUserService   = require('../services/users/create_user');
var UpdateUserService   = require('../services/users/update_user');
var ApiError            = require('../errors/api_error');
var authenticator       = require('../middlewares/authenticator');
var _                   = require('lodash');

userController.route('/users')
  .get(authenticator, function(req, res) {
    return sequelize.User.findAll({attributes: ['id', 'name', 'email', 'identifier', 'birthdate', 'avatar']})
      .then(function(users) {return res.json(users)})
      .catch(function(err) {
        return res.status(422).json(new ApiError(err.message, 422))
      });
  })

  .post(function(req, res){
    var userParams = {
      name:         req.body.name,
      email:        req.body.email,
      birthdate:    req.body.birthdate,
      password:     req.body.password,
      avatar:       req.body.avatar
    };

    return CreateUserService.call(userParams, function(response) {
      if(response.success) return res.json(response.result);
      return res.status(response.status)
        .json(new ApiError(response.message, response.status, response.errors));
    });
  })

  .put(authenticator, function(req, res){
    var userParams = _.pick(req.body, ['name', 'email', 'birthdate', 'password', 'avatar']);
    return UpdateUserService.call(req.user, userParams, function(response){
      if (response.success) return res.status(200).json(response.result);
      return res.status(response.status)
        .json(new ApiError(response.message, response.status, response.errors));
    });
  });

userController.route('/users/profile')
  .get(authenticator, function(req, res) {return res.json(req.user)});

module.exports = userController;
