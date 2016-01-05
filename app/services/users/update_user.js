var User    = require('../../models/user');
var _       = require('lodash');

module.exports.call = function(params, cb) {
  User.findById(params.id)
    .then(function(user){
      if(user){
        user.update(_.omit(params, 'id'))
          .then(function(){
            cb({result: user, status: 200, success: true,
              message: 'User has been updated.'});
          })
          .catch(function(err){
            cb({result: null, status: 422, success: false,
               message: 'User cannot be updated.', errors: err.errors});
          });
      }else{
        cb({result: null, status: 404, success: false,
           message: 'User not found.', errors: []});
      }
    })
    .catch(function(err){
      cb({result: null, status: 404, success: false,
         message: 'User not found.', errors: err.errors});
    });
};
