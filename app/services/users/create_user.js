var sequelize           = require('../../models');
var nid                 = require('nid');
var JwtTokenGenerator   = require('../sessions/jwt_token_generator');
var app                 = require('../../../app');
var _                   = require('lodash');
var UploaderAvatar      = require('../../helpers/uploader_avatar');

function createUser (params, done) {
  var UploaderUserAvatar;

  var generateIdentifier = function(cb) {
    var newIdentifier = nid({hex: 6}).call();

    return sequelize.User.count({where: {identifier: newIdentifier}})
      .then(function(c) {
        if (c > 0) return generateIdentifier(cb);
        return cb(newIdentifier);
      });
  };

  var uploadAvatar = function (avatar, identifier, cb) {
    UploaderUserAvatar = new UploaderAvatar('users/' + identifier + '/avatar');
    return UploaderUserAvatar.putImage(avatar, identifier, function(err, data) {
      if (err) return cb(err);
      return cb(false, data);
    });
  };

  var saveUser = function (user, cb) {
    return user.save()
      .then(function(u) {
        var token = JwtTokenGenerator.call({identifier: u.identifier}, app.get('jwtKey'), '100d');
        return cb({result: {access_token: token}, status: 200, success: true,
          message: 'User has been created.'});
      })
      .catch(function(error) {
        if (user.avatar) UploaderUserAvatar.deleteImage(user.avatarName, function (err, data) {});
        return cb({result: null, status: 422, success: false,
           message: 'User could not be created.', errors: error.errors});
      })
  };

  return generateIdentifier(function (newIdentifier) {

    // Assign unique identifier
    params.identifier = newIdentifier;

    var user = sequelize.User.build(_.pick(params, ['name', 'email',
      'birthdate', 'password', 'identifier']));

    if (params.avatar) {
      return uploadAvatar(params.avatar, params.identifier, function(err, data) {
        if (err) {
          return done({result: null, status: 422, success: false,
             message: 'User could not be created.', errors: [err.message]});
        }

        user.avatar = data.url;
        user.avatarName = data.name;

        return saveUser(user, done);
      });
    }

    saveUser(user, done);
  });
}

module.exports.call = function(params, done) {
  return createUser(params, done);
};
