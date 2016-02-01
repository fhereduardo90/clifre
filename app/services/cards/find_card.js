var sequelize     = require('../../models');
var _             = require('lodash');

module.exports.call = function(companyId, id, cb) {
  if (_.isEmpty(companyId)) companyId = 0;
  if (_.isEmpty(id)) id = 0;

  return sequelize.Company.findById(parseInt(companyId), {attributes: ['id']})
    .then(function(company) {
      if (_.isEmpty(company)) {
        return cb({result: null, status: 404, success: false,
          message: 'Company not found.', errors: []});
      }

      return sequelize.Card.findOne({
        where: {id: parseInt(id), company_id: company.id},
        attributes: ['id', 'title', 'seals', 'description', 'color', 'company_id']
      })
        .then(function(card) {
          if (card) {
            return cb({result: card, status: 200, success: true, message: '', errors: []});
          } else {
            return cb({result: null, status: 404, success: false,
              message: 'Card not found.', errors: []});
          }
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
