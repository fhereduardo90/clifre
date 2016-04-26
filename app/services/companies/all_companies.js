var sequelize     = require('../../models');
var errorParse    = require('../../helpers/error_parse');
var ApiError      = require('../../errors/api_error');

module.exports.call = function () {
  return sequelize.Company.findAll(
    {attributes: ['id', 'name', 'identifier', 'email', 'about',
      'address', 'phone', 'avatar']}
  ).then(function (companies) {
    return {result: companies, status: 200, message: '', success: true, errors: []};
  }).catch(function (err) {
    throw new ApiError('Companies not found.', 404, errorParse(err));
  });
}
