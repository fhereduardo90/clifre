var sequelize    = require('../../models');
var _            = require('lodash');

module.exports.call = function(params, cb) {
  if(_.isEmpty(params) || !_.isPlainObject(params)){
    return cb({result: null, status: 422, success: false,
      message: 'Params do not have a correct format.', errors: []})
  }

  return sequelize.Company.create(params)
    .then(function(company){
      return cb({result: company, status: 200, success: true,
         message: 'Company has been created.', errors: []});
    })
    .catch(function(err){
      return cb({result: null, status: 422, success: false,
        message: 'Company cannot be created.', errors: err.errors});
    });
};
