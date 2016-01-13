var Company    = require('../../models/company');
var _       = require('lodash');

module.exports.call = function(params, cb) {
  if(_.isEmpty(params) || !_.isPlainObject(params)){
    return cb({result: null, status: 422, success: false,
      message: 'Params do not have a correct format.', errors: []})
  }

  Company.findById(params.id)
    .then(function(company){
      if(company){
        company.update(_.omit(params, 'id'))
          .then(function(){
            cb({result: company, status: 200, success: true,
              message: 'Company has been updated.'});
          })
          .catch(function(err){
            cb({result: null, status: 422, success: false,
               message: 'Company cannot be updated.', errors: err.errors});
          });
      }else{
        cb({result: null, status: 404, success: false,
           message: 'Company not found.', errors: []});
      }
    })
    .catch(function(err){
      cb({result: null, status: 404, success: false,
         message: 'Company not found.', errors: err.errors});
    });
};
