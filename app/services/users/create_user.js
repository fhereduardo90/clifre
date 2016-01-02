var User    = require('../../models/user');

module.exports.call = function(params, cb) {
  User.build(params).save()
    .then(function(user){
      cb({result: user, success: true, errors: []});
    })
    .catch(function(errors){
      cb({result: null, success: false, errors: errors})
    });
};
