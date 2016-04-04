var jwt = require('jsonwebtoken');

module.exports.call = function(params, jwtPrivateKey, expiresTime) {
  if (!jwtPrivateKey) throw Error('secret key is undefined.');
  
  return jwt.sign(params, jwtPrivateKey, {
    expiresIn: expiresTime || 600
  });
};
