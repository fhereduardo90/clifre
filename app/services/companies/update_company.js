const errorParse = require('../../helpers/error_parse');
const ApiError = require('../../errors/api_error');
const UploaderAvatar = require('../../helpers/uploader_avatar');
const Promise = require('bluebird');
const _ = require('lodash');
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
function uploadAvatar(avatar, path, company) {
  // Initializer UploaderAvatar instance and upload company avatar
  const UploaderCompanyAvatar = new UploaderAvatar(path);
  // deprecated avatarName
  const oldAvatarName = company.avatarName;
  return UploaderCompanyAvatar.putImage(avatar, company.identifier)
    .then(data => (
      company.update({ avatar: data.url, avatarName: data.name })
    ))
    .then((c) => {
      UploaderCompanyAvatar.deleteImage(oldAvatarName);
      return c;
    })
    .catch((err) => {
      company.destroy();
      UploaderCompanyAvatar.deleteImage(company.avatarName);
      throw err;
    });
}

module.exports.call = (company, params) => (
  Promise.try(() => {
    try {
      return company.update(_.omit(params, ['avatar']))
        .then((c) => {
          const path = `companies/${company.identifier}/avatar`;
          if (params.avatar) {
            return uploadAvatar(params.avatar, path, company);
          }

          return c;
        })
        .then(c => (
          { result: CompanyDetailSerializer.serialize(c), status: 200, success: true }
        ))
        .catch((err) => {
          throw new ApiError('Company could not be updated.', 422, errorParse(err));
        });
    } catch (e) {
      throw new ApiError('Company could not be updated.', 422, errorParse(e));
    }
  })
);
