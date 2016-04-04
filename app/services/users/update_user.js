var sequelize           = require('../../models');
var UploadUserAvatar    = require('./upload_user_avatar');

module.exports.call = function(user, params, cb) {
  try {
    if (params.avatar) {
      return UploadUserAvatar.call(params.avatar, user.identifier, function (err, urlAvatar) {
        if (err) {
          return cb({result: null, status: 404, success: false,
             message: 'User could not be updated.', errors: [err.message]});
        }
        params.avatar = urlAvatar;
        return updateUser(user, params, cb);
      });
    }
    return updateUser(user, params, cb);
  } catch (e) {
    return cb({result: null, status: 422, success: false,
      message: 'User could not be updated', errors: [e.message]});
  }
};

function updateUser (user, params, cb) {
  return user.update(params)
    .then(function() {
      return cb({result: {id: user.id, name: user.name, avatar: user.avatar, birthdate: user.birthdate,
         email: user.email}, status: 200, success: true, message: 'User has been updated.'});
    })
    .catch(function(err) {
      return cb({result: null, status: 404, success: false,
         message: 'User could not be updated.', errors: err.errors});
    })
}
