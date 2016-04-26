var sequelize             = require('../../models');
var _                     = require('lodash');
var UploaderAvatar        = require('../../helpers/uploader_avatar');
var errorParse            = require('../../helpers/error_parse');
var ApiError              = require('../../errors/api_error');
var JwtTokenGenerator     = require('../sessions/jwt_token_generator');
var shortid               = require('shortid');
var app                   = require('../../../app');

function uploadAvatar (avatar, path, company) {
  // Initializer UploaderAvatar instance and upload company avatar
  var UploaderCompanyAvatar = new UploaderAvatar(path);
  return UploaderCompanyAvatar.putImage(avatar, company.identifier)
    .then(function (data) {
      // update the current company with two new fields avatar and avatarName
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
  // return new Promise(function (resolve, reject) {
  params.identifier = shortid.generate().toLowerCase();
  var token = null;
  // Create Company without avatar
  return sequelize.Company.create(_.omit(params, ['avatar']))
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
    .then(function () {
      return {result: {access_token: token}, status: 200, success: true,
        message: 'Company has been created.', errors: []};
    })
    .catch(function (err) {
      throw new ApiError('Company could not be created.', 422, errorParse(err));
    });
}
