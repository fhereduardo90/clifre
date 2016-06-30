var sequelize = require('../../models');
var _ = require('lodash');
var UploaderAvatar = require('../../helpers/uploader_avatar');
var errorParse = require('../../helpers/error_parse');
var ApiError = require('../../errors/api_error');
var JwtTokenGenerator = require('../sessions/jwt_token_generator');
var shortid = require('shortid');
var app = require('../../../app');
var CompanyMailer = require('../../mailers/company_mailer');

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
  return UploaderCompanyAvatar.putImage(avatar, company.identifier)
    .then(function (data) {
      // Update the current company with two new fields avatar and avatarName
      company.avatar = data.url;
      company.avatarName = data.name;
      return company.save();
    })
    .catch(function (err) {
      company.destroy();
      UploaderCompanyAvatar.deleteImage(company.avatarName);
      throw err;
    });
}

module.exports.call = function (params) {
  // Generate a random identifier.
  params.identifier = shortid.generate().toLowerCase();
  var token = null;
  var companyInstance = sequelize.Company.build(_.omit(params, ['avatar']));

  // Create Company without avatar
  return companyInstance.save()
    .then(function (company) {
      try {
        token = JwtTokenGenerator.call({identifier: company.identifier}, app.get('jwtKey'), '100d');
      } catch (err) {
        company.destroy();
        throw err;
      }
      var path = 'companies/' + company.identifier + '/avatar';
      if (params.avatar) return uploadAvatar(params.avatar, path, company);
      return company;
    })
    .then(function (company) {
      // Send welcome email to new company.
      CompanyMailer.welcomeMail(company.id);
      return {result: {accessToken: token}, status: 201};
    })
    .catch(function (err) {
      throw new ApiError('Company could not be created.', 422, errorParse(err));
    });
}
