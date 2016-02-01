var sequelize     = require('../../models');
var _             = require('lodash');

module.exports.call = function(params, cb) {
  if (_.isEmpty(params.company_id)) params.company_id = 0;
  if (_.isEmpty(params.id)) params.id = 0;

  return sequelize.Company.findById(parseInt(params.company_id), {attributes: ['id']})
    .then(function(company) {
      if (_.isEmpty(company)) {
        return cb({result: null, status: 404, success: false,
          message: 'Company not found.', errors: []});
      }

      return sequelize.Card.findOne({
        where: {id: parseInt(params.id), company_id: company.id}
      })
        .then(function(card) {
          if (card) {
            card.update(_.omit(params, ['id', 'company_id']))
              .then(function(updatedCard) {
                return cb({result: updatedCard, status: 200, success: true, message: 'Card has been updated', errors: []});
              })
              .catch(function(err) {
                return cb({result: null, status: 422, success: false,
                  message: 'Card cannot be updated.', errors: err.errors});
              });
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
