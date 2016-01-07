var Company     = require('../../models/company');
var _           = require('lodash');

module.exports.call = function(companyId, cb) {
  if(_.isEmpty(companyId) || !_.isNumber(companyId)){
    companyId = 0;
  }

  return Company.findById(companyId, {attributes: ['id', 'name', 'about', 'address', 'phone', 'avatar_path']})
    .then(function(company){
      if(company){
        return cb({result: company, status: 200, success: true, message: '', errors: []});
      }else{
        return cb({result: null, status: 404, success: false,
          message: 'Company not found.', errors: []});
      }
    })
    .catch(function(err){
      return cb({result: null, status: 404, success: false,
        message: 'Company not found.', errors: err.errors});
    });
};
