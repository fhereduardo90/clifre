var sequelize     = require('../../models');
var errorParse    = require('../../helpers/error_parse');
var ApiError      = require('../../errors/api_error');

module.exports.call = function () {
  return sequelize.User.findAll(
    {attributes: ['id', 'name', 'email', 'identifier', 'birthdate', 'avatar']}
  ).then(function (users) {
    return {result: users, status: 200, message: '', success: true, errors: []};
  }).catch(function (err) {
    throw new ApiError('Users not found.', 404, errorParse(err));
  });
}
