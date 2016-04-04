var sessionController   = require('express').Router();
var sequelize           = require('../models');
var app                 = require('../../app');
var Authenticate        = require('../services/sessions/authenticate');
var ApiError            = require('../errors/api_error');

sessionController.route('/authenticate')
  .post(function(req, res) {
    var params = {
      email:        req.body.email,
      password:     req.body.password
    };

    return Authenticate.call(params.email, params.password, function(err, token) {
      if (err) return res.status(422).json(new ApiError(err.message, 422));
      if (!token) return res.status(422).json(new ApiError('Authentication failed. Wrong email or password.', 422));

      return res.json({access_token: token});
    });
  });

module.exports = sessionController;
