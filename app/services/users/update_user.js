var sequelize           = require('../../models');
var UploaderAvatar      = require('../../helpers/uploader_avatar');

// function updateUser (user, params, done) {
//   return user.update(params)
//     .success(function() { return done(false, user); })
//       // return done({result: {id: user.id, name: user.name, avatar: user.avatar, birthdate: user.birthdate,
//       //    email: user.email}, status: 200, success: true, message: 'User has been updated.'});
//     .error(function (err) { return done(err, null); });
// }

module.exports.call = function (user, params, done) {
  try {
    if (params.avatar) {
      UploaderUserAvatar =  new UploaderAvatar('users/' + user.identifier + '/avatar');
      return UploaderUserAvatar.putImage(params.avatar, user.identifier, function (err, data) {
        if (err) {
          return done({result: null, status: 404, success: false,
             message: 'User could not be updated.', errors: [err.message]});
        }
        params.avatar = data.url;
        params.avatarName = data.name;

        var previousAvatarName = user.avatarName;

        return user.update(params)
          .then(function (usr) {
            if (usr.avatar) UploaderUserAvatar.deleteImage(previousAvatarName, function(err, data) {});
            return done({result: {id: usr.id, name: usr.name, avatar: usr.avatar, birthdate: usr.birthdate,
              email: usr.email}, status: 200, success: true, message: 'User has been updated.'});
          })
          .catch(function (e) {
            UploaderUserAvatar.deleteImage(params.avatarName, function (err, data) {});
            return done({result: null, status: 422, success: false,
                message: 'User could not be updated', errors: [e.message]});
          })
      });
    }

    return user.update(params)
      .then(function (usr) {
        return done({result: {id: usr.id, name: usr.name, avatar: usr.avatar, birthdate: usr.birthdate,
          email: usr.email}, status: 200, success: true, message: 'User has been updated.'});
      })
      .catch(function (err) {
        return done({result: null, status: 422, success: false,
          message: 'User could not be updated', errors: err.message});
      });

  } catch (e) {
    return done({result: null, status: 422, success: false,
      message: 'User could not be updated', errors: [e.message]});
  }
};
