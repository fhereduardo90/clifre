var sequelize = require('../../models');
var JwtTokenGenerator = require('../sessions/jwt_token_generator');
var app = require('../../../app');
var _ = require('lodash');
var UploaderAvatar = require('../../helpers/uploader_avatar');
var shortid = require('shortid');
var ApiError = require('../../errors/api_error');
var errorParse = require('../../helpers/error_parse');
var UserMailer = require('../../mailers/user_mailer');

/**
* Upload user avatar to S3 and saving it in a specefic path.
*
* @param {string} avatar the base64 that will upload to S3.
* @param {string} path the place where the avatar will be located.
* @param {Object} user the instance of the current user.
* @returns {Promise} Returns an UploaderAvatar promise.
*/
function uploadAvatar (avatar, path, user) {
  // Initialize UploaderAvatar instance and uploading user avatar
  var UploaderUserAvatar = new UploaderAvatar(path);
  return UploaderUserAvatar.putImage(avatar, user.identifier)
    .then(function success(data) {
      // Update the current user with two new fields avatar and avatarName
      user.avatar = data.url;
      user.avatarName = data.name;
      return user.save();
    })
    .catch(function error(err) {
      user.destroy();
      UploaderUserAvatar.deleteImage(user.avatarName);
      throw err;
    });
}

module.exports.call = function (params) {
  // Generate a random identifier.
  params.identifier = shortid.generate().toLowerCase();
  var token = null;
  var userInstance = sequelize.User.build(_.omit(params, ['avatar']));

  // Create User without avatar
  return userInstance.save()
    .then(function success(user) {
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
    .then(function success(user) {
      // Send welcome email to new user.
      UserMailer.welcomeMail(user.id);
      return {result: {accessToken: token}, status: 200, success: true,
        message: 'User has been created.', errors: []};
    })
    .catch(function error(err) {
      throw new ApiError('User could not be created.', 422, errorParse(err));
    });
}
