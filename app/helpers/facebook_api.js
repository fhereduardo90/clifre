var FB = require('fb');
var Promise = require('bluebird');
var ApiError = require('../errors/api_error');
var errorParse = require('./error_parse');
module.exports = (function (){
  return function FacebookApi(accessToken) {
    FB.setAccessToken(accessToken);
    return {
      me: function me() {
        return new Promise(function (resolve, reject) {
          FB.api('me', { fields: ['id', 'name', 'email'], access_token: FB.getAccessToken() }, function (res) {
            if (res.error) reject(new ApiError('Facebook OAuth Token failed.', 422, errorParse(res.error)));
            else resolve(res);
          });
        });
      }
    };
  }
})();
