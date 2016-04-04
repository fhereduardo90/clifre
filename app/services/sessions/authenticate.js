var sequelize           = require('../../models');
var _                   = require('lodash');
var jwtTokenGenerator   = require('./jwt_token_generator');
var app                 = require('../../../app');

module.exports.call = function(email, password, done) {
  return sequelize.User.findOne({where: {email: email}})
    .then(function(user) {
      if (!user) done(new Error('Authentication failed. Wrong email or password.'), null);

      sequelize.User.authenticate(password, user.password, function(err, result) {
        if (err) return done(err, null);
        if (!result) return done(new Error('Authentication failed. Wrong email or password.'), null);

        try {
          var token = jwtTokenGenerator.call({identifier: user.identifier}, app.get('jwtKey'), '100d');
          return done(null, token);
        } catch (e) {
          return done(e, null)
        }
      })
    })
    .catch(function(err) {
      return done(new Error('Authentication failed. Wrong email or password.'), null);
    })
};
