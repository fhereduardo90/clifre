var sequelize           = require('../../models');
var nid                 = require('nid');
var JwtTokenGenerator   = require('../sessions/jwt_token_generator');
var app                 = require('../../../app');
var _                   = require('lodash');
var UploadUserAvatar    = require('./upload_user_avatar');


module.exports.call = function(params, cb) {
  return generateIdentifier(params, cb);
};

function generateIdentifier(params, cb){
  var newIdentifier = nid({hex: 6}).call();

  return sequelize.User.count({where: {identifier: newIdentifier}})
    .then(function(c){
      if (c > 0) return generateIdentifier(params, cb);

      // Assign unique identifier
      params.identifier = newIdentifier;

      var user = sequelize.User.build(_.pick(params, ['name', 'email',
        'birthdate', 'password', 'identifier']));

      if (params.avatar) {
        return UploadUserAvatar.call(params.avatar, user.identifier, function (err, urlAvatar) {
          if (err) {
            return cb({result: null, status: 422, success: false,
              message: 'User could not be created', errors: [err.message]});
          }
          user.avatar = urlAvatar;
          return createUser(user, cb);
        });
      }
      return createUser(user, cb);
    });
}

function createUser (user, cb) {
  return user.save()
    .then(function(user){
      var token = JwtTokenGenerator.call({identifier: user.identifier}, app.get('jwtKey'), '100d');``
      return cb({result: {access_token: token}, status: 200, success: true,
        message: 'User has been created.'});
    })
    .catch(function(err){
      return cb({result: null, status: 422, success: false,
         message: 'User could not be created.', errors: err.errors});
    });
}
