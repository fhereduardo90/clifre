var sequelize = require('../../models');
var _ = require('lodash');
var errorParse = require('../../helpers/error_parse');
var ApiError = require('../../errors/api_error');
var UploaderAvatar = require('../../helpers/uploader_avatar');
var Promise = require('bluebird');
// Serializers
const CompanyDetailSerializer = require('../../serializers/companies/company_detail');

/**
* Upload company avatar to S3 and saving it in a specefic path.
*
* @param {string} avatar, the base64 that will be uploaded to S3.
* @param {string} path, the place where the avatar will be located.
* @param {Object} company, the instance of the current company.
* @returns {Promise} Returns an UploaderAvatar promise.
*/
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
      return company.update(params)
        .then(function success(c) {
          var path = 'companies/' + company.identifier + '/avatar';
          if (params.avatar) return uploadAvatar(params.avatar, path, company);
          return c;
        })
        .then(function success(c) {
          return {result: CompanyDetailSerializer.serialize(c), status: 200, success: true};
        })
        .catch(function error(err) {
          throw new ApiError('Company could not be updated.', 422, errorParse(err));
        });
    } catch (e) {
      throw new ApiError('Company could not be updated.', 422, errorParse(e));
    }
  });
};
