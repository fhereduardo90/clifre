var mkdirp              = require('mkdirp');
var S3Client            = require('./aws_s3_client');
var _                   = require('lodash');

function UploaderAvatar (locationPath) {
  var path = locationPath;


  this.putImage = function (avatar, identifier, done) {
    try {
      // Split image/type and base64
      var matches = avatar.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      // base64 to buffer
      var buffer = new Buffer(matches[2], 'base64');
      // Generate avatar name
      var avatarName = null;

      switch (matches[1]) {
        case 'image/jpeg':
          avatarName = identifier + '_' + Date.now() + '.jpeg';
          break;
        case 'image/png':
          avatarName = identifier + '_' + Date.now() + '.png';
          break;
        default:
          return cb({result: null, status: 422, success: false,
            message: 'Company could not be created.', errors: ['Only accepts image/jpeg or image/png.']});
          break;
      };

      var s3Params = {
        Bucket: process.env.AWS_S3_BUCKET + '/' + path,
        Key: avatarName,
        Body: buffer,
        ContentType: matches[1],
        ACL: 'public-read',
      };

      return S3Client.putObject(s3Params, function(err, data) {
        if (err) return done(err, null);
        var response = {
          url: S3Client.endpoint.href + s3Params.Bucket + '/' + avatarName,
          name: avatarName
        }
        return done(false, response);
      });
    } catch (e) {
      return done(e, null);
    }
  }

  this.deleteImage = function (imageName, done, newPath) {
    var s3Params = {
      Bucket: process.env.AWS_S3_BUCKET + '/' + (newPath || path),
      Key: imageName
    }

    return S3Client.deleteObject(s3Params, function (err, data) {
      if (err) return done(err, null);
      return done(false, data);
    });
  }
}

module.exports = UploaderAvatar;
