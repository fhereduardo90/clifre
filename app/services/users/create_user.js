var sequelize           = require('../../models');
var JwtTokenGenerator   = require('../sessions/jwt_token_generator');
var app                 = require('../../../app');
var _                   = require('lodash');
var UploaderAvatar      = require('../../helpers/uploader_avatar');
var shortid             = require('shortid');
var ApiError            = require('../../errors/api_error');
var errorParse          = require('../../helpers/error_parse');

function uploadAvatar (avatar, path, user) {
  // Initializer UploaderAvatar instance and upload user avatar
  var UploaderUserAvatar = new UploaderAvatar(path);
  return UploaderUserAvatar.putImage(avatar, user.identifier)
    .then(function (data) {
      // update the current user with two new fields avatar and avatarName
      user.avatar = data.url;
      user.avatarName = data.name;
      return user.save();
    })
    .catch(function (err) {
      user.destroy();
      UploaderUserAvatar.deleteImage(user.avatarName);
      throw err;
    });
}

module.exports.call = function (params) {
  params.identifier = shortid.generate().toLowerCase();
  var token = null;
  var skipValidations = [];
  var userInstance = sequelize.User.build(_.omit(params, ['avatar']));

  // Skip email validation if there is a facebookId and email is blank.
  // Skip facebookId validation if it's blank.
  if (userInstance.facebookId) {
    if (!userInstance.email) skipValidations.push('email');
    userInstance.password = shortid.generate().toLowerCase();
  } else {
    skipValidations.push('facebookId');
  }

  userInstance.temporalPassword = userInstance.password;

  // Create User without avatar

  return userInstance.validate({skip: skipValidations})
    .then(function (err) {
      if (err) throw err;
      else return userInstance.save({validate: false})
    })
    .then(function (user) {
      try {
        token = JwtTokenGenerator.call({identifier: user.identifier}, app.get('jwtKey'), '100d');
      } catch (err) {
        user.destroy();
        throw err;
      }
      var path = 'users/' + user.identifier + '/avatar';
      if (params.avatar) return uploadAvatar(params.avatar, path, user);
      return user;
    })
    .then(function () {
      return {result: {access_token: token}, status: 200, success: true,
        message: 'User has been created.', errors: []};
    })
    .catch(function (err) {
      throw new ApiError('User could not be created.', 422, errorParse(err));
    });
}
