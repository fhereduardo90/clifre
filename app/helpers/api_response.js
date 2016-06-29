var ApiError      = require('../errors/api_error');
var _             = require('lodash');

module.exports.error = function (res, params) {
  if (!_.isObject(params)) params = {};
  return res.status(params.status).json(new ApiError(params.message,
    params.status, params.errors)).end();
};

module.exports.success = function (res, params) {
  if (!_.isObject(params)) params = {};
  return res.status(params.status).json(params.result).end();
};

module.exports.ok = function ok(res) {return res.status(200).end();}
