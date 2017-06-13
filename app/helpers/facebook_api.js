const FB = require('fb');
const Promise = require('bluebird');
const ApiError = require('../errors/api_error');
const errorParse = require('./error_parse');

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["me"] }] */
class FacebookApi {
  constructor(accessToken) {
    FB.setAccessToken(accessToken);
  }

  me() {
    return new Promise((resolve, reject) => {
      FB.api('me', { fields: ['id', 'name', 'email'], access_token: FB.getAccessToken() }, (meResult) => {
        if (meResult.error) {
          return reject(
            new ApiError('Facebook OAuth Token failed.', 422, errorParse(meResult.error))
          );
        }

        return FB.api('me/picture?width=720&height=720', { redirect: false, access_token: FB.getAccessToken() }, (pictureResult) => {
          if (pictureResult.error) {
            reject(new ApiError('Facebook OAuth Token failed.', 422, errorParse(pictureResult.error)));
          }

          return resolve(Object.assign({}, meResult, { avatar: pictureResult.data.url }));
        });
      });
    });
  }
}

module.exports = FacebookApi;
