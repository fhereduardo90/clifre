var User    = require('../../models/user');
var nid     = require('nid');

module.exports.call = function(params, cb) {
  var user = User.build(params);
  generateIdentifier(user, cb);
};

function generateIdentifier(user, cb){
  var newIdentifier = nid({hex: 6}).call();

  User.count({where: {identifier: newIdentifier}})
    .then(function(c){
      if(c >  0){
        generateIdentifier(user, cb);
      }else{
        user.identifier = newIdentifier;
        user.save()
          .then(function(user){
            cb({result: user, status: 200, success: true, message: 'User has been created.'});
          })
          .catch(function(err){
            cb({result: null, status: 422, success: false,
               message: 'Use cannot be created.', errors: err.errors});
          });
      }
    });
}
