require('dotenv').config({silent: true});
var jwt = require('jsonwebtoken');

module.exports = (function () {
  var instance;

  function JsonWebToken(jwtPrivateKey) {
    var _jwtPrivateKey = jwtPrivateKey;
    instance = this;

    function generate(params, expiresTime) {
      if (!_jwtPrivateKey) throw Error('secret key is undefined.');

      return jwt.sign(params, _jwtPrivateKey, {
        expiresIn: expiresTime || 600
      });
    }

    return {
      generate: generate
    }
  }

  JsonWebToken.init = function init(jwtPrivateKey) {
    if (instance) return instance;
    else return new JsonWebToken(jwtPrivateKey);
  }

  return JsonWebToken.init(process.env.AUTH0_CLIENT_SECRET);
})();
