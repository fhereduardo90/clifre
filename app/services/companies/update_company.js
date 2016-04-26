var sequelize         = require('../../models');
var _                 = require('lodash');
var errorParse        = require('../../helpers/error_parse');
var ApiError          = require('../../errors/api_error');
var UploaderAvatar    = require('../../helpers/uploader_avatar');
var Promise           = require('bluebird');

function uploadAvatar (avatar, path, company) {
  // Initializer UploaderAvatar instance and upload company avatar
  var UploaderCompanyAvatar = new UploaderAvatar(path);
  // deprecated avatarName
  var oldAvatarName = company.avatarName;
  return UploaderCompanyAvatar.putImage(avatar, company.identifier)
    .then(function (data) {
      // update the current company with two new fields avatar and avatarName
      company.avatar = data.url;
      company.avatarName = data.name;
      return company.save();
    })
    .then(function (c) {
      UploaderCompanyAvatar.deleteImage(oldAvatarName);
      return c;
    })
    .catch(function (err) {
      company.destroy();
      UploaderCompanyAvatar.deleteImage(company.avatarName);
      throw err;
    });
}

module.exports.call = function(company, params) {
  return new Promise.try(function () {
    try {
      company.temporalPassword = params.password;
      return company.update(_.omit(params, ['avatar']))
        .then(function (c) {
          var path = 'companies/' + company.identifier + '/avatar';
          if (params.avatar) return uploadAvatar(params.avatar, path, company);
          return c;
        })
        .then(function (c) {
          var response = _.pick(c, ['id', 'name', 'email', 'identifier', 'about',
            'address', 'phone', 'avatar']);
          return {result: response, status: 200, success: true,
            message: 'Company has been updated.', errors: []};
        })
        .catch(function (err) {
          throw new ApiError('Company could not be updated.', 422, errorParse(err));
        });
    } catch (e) {
      throw new ApiError('Company could not be updated.', 422, errorParse(e));
    }
  });
};
