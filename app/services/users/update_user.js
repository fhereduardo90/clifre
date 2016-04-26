var sequelize           = require('../../models');
var JwtTokenGenerator   = require('../sessions/jwt_token_generator');
var app                 = require('../../../app');
var _                   = require('lodash');
var UploaderAvatar      = require('../../helpers/uploader_avatar');
var shortid             = require('shortid');
var ApiError            = require('../../errors/api_error');
var errorParse          = require('../../helpers/error_parse');
var Promise             = require('bluebird');

function uploadAvatar (avatar, path, user) {
  // Initializer UploaderAvatar instance and upload user avatar
  var UploaderUserAvatar = new UploaderAvatar(path);
  // deprecated avatarName
  var oldAvatarName = user.avatarName;
  return UploaderUserAvatar.putImage(avatar, user.identifier)
    .then(function (data) {
      // update the current user with two new fields avatar and avatarName
      user.avatar = data.url;
      user.avatarName = data.name;
      return user.save();
    })
    .then(function (u) {
      UploaderUserAvatar.deleteImage(oldAvatarName);
      return u;
    })
    .catch(function (err) {
      user.destroy();
      UploaderUserAvatar.deleteImage(user.avatarName);
      throw err;
    });
}

module.exports.call = function(user, params) {
  return Promise.try(function () {
    try {
      return user.update(_.omit(params, ['avatar']))
        .then(function (u) {
          var path = 'users/' + u.identifier + '/avatar';
          if (params.avatar) return uploadAvatar(params.avatar, path, u);
          return u;
        })
        .then(function (u) {
          var response = _.pick(u, ['id', 'name', 'email', 'identifier',
            'birthdate', 'avatar']);
          return {result: response, status: 200, success: true,
            message: 'User has been updated.', errors: []};
        })
        .catch(function (err) {
          throw new ApiError('User could not be updated.', 422, errorParse(err));
        });
    } catch (e) {
      throw new ApiError('User could not be updated.', 422, errorParse(e));
    }
  });
};
