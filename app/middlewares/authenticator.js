var sequelize       = require('../models');
var app             = require('../../app');
var jwt             = require('jsonwebtoken');
var ApiError        = require('../errors/api_error');

module.exports =  function(req, res, next) {
  var token = req.headers['authorization'].split(' ')[1];
  if (!token) return res.status(401).json(new ApiError('No token provided.', 401));
  return jwt.verify(token, app.get('jwtKey'), function(err, decoded) {
    if (err) return res.status(403).json(new ApiError('Failed to authenticate token.', 403, [err.message]));
    return sequelize.User.findOne(
      {where: {identifier: decoded.identifier},
        attributes: ['id', 'name', 'email', 'identifier', 'birthdate', 'avatar']})
      .then(function(user){
        if (!user) return res.status(403) .json(new ApiError('Failed to authenticate token.', 403));
        req.user = user;
        next();
        return null;
      })
      .catch(function(err){
        return res.status(403).json(new ApiError('Failed to authenticate token.', 403));
      });
  });
};
