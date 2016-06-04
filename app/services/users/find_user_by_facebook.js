var sequelize     = require('../../models');
var ApiError      = require('../../errors/api_error');
var errorParse    = require('../../helpers/error_parse');

module.exports.call = function (facebookId) {
  var attrs = ['id', 'name', 'email', 'identifier', 'birthdate', 'avatar'];
  return sequelize.User.findOne({where: {facebookId: facebookId}, attributes: attrs})
    .then(function (user) {
      
      return {result: user, status: 200, success: true,
        message: '', errors: []};
    })
    .catch(function (err) {
       throw ApiError('User not found.', 404, errorParse(err));
    });
};
