var sequelize     = require('../../models');
var _             = require('lodash');

module.exports.call = function(params, cb) {
  if(_.isEmpty(params) || !_.isPlainObject(params)){
    return cb({result: null, status: 422, success: false,
      message: 'Params do not have a correct format.', errors: []})
  }

  if (_.isEmpty(params.company_id)) {
    params.company_id = 0;
  }

  return sequelize.Company.findById(parseInt(params.company_id), {attributes: ['id']})
    .then(function(company) {

      if (_.isEmpty(company)) {
        return cb({result: null, status: 404, success: false,
          message: 'Company not found.', errors: []});
      }

      var cardInstance = sequelize.Card.build(params);

      return sequelize.Card.create(params)
          .then(function(card) {
            return cb({result: card, status: 200, success: true,
              message: 'Card has been created.', errors: []});
          })
          .catch(function(err) {
            return cb({result: null, status: 422, success: false,
              message: 'Card cannot be created.', errors: err.errors});
          });
    })
    .catch(function(err) {
      return cb({result: null, status: 404, success: false,
        message: 'Company not found.', errors: err.errors});
    });
};
