var sequelize     = require('../../models');
var _             = require('lodash');

module.exports.call = function(companyId, cb) {
  if (_.isEmpty(companyId)) {
    companyId = 0;
  }

  return sequelize.Company.findById(parseInt(companyId), {attributes: ['id']})
    .then(function(company) {
      if (_.isEmpty(company)) {
        return cb({result: null, status: 404, success: false,
          message: 'Company not found.', errors: []});
      }

      return company.getCards({attributes: ['id', 'title', 'seals', 'description', 'color', 'company_id']})
        .then(function(cards) {
          return cb({result: cards, status: 200, success: true, message: '', errors: []});
        })
        .catch(function(err) {
          return cb({result: null, status: 404, success: false,
            message: 'Card not found.', errors: err.errors});
        });
    })
    .catch(function(err) {
      return cb({result: null, status: 404, success: false,
        message: 'Company not found.', errors: err.errors});
    });
};
