var sequelize     = require('../../models');
var ApiError      = require('../../errors/api_error');
var errorParse    = require('../../helpers/error_parse');

module.exports.call = function (id) {
  var attrs = ['id', 'name', 'email', 'identifier', 'about', 'address',
    'phone', 'avatar'];
  return sequelize.Company.findById(id, {attributes: attrs})
    .then(function (company) {
      if (company) {
        return {result: company, status: 200, success: true,
          message: '', errors: []};
      } else {
        throw new Error('Company not found.');
      }
    })
    .catch(function (err) {
       throw ApiError('Copampany not found.', 404, errorParse(err));
    });
};
