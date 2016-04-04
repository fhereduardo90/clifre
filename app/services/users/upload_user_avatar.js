var mkdirp              = require('mkdirp');
var S3Client            = require('../../helpers/aws_s3_client');

module.exports.call = function (avatar, identifier, done) {
  try {
    // Split image/type and base64
    var matches = avatar.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    // Generate user's avatar path
    var path = 'users/avatars/' + identifier + '_' + Date.now();
    // base64 to buffer
    var buffer = new Buffer(matches[2], 'base64');
    // Generate avatar name
    var avatarName = null;
    switch (matches[1]) {
      case 'image/jpeg':
        avatarName = 'avatar.jpeg';
        break;
      case 'image/png':
        avatarName = 'avatar.png';
        break;
      default:
        return cb({result: null, status: 422, success: false,
          message: 'User could not be created.', errors: ['Only accepts image/jpeg or image/png.']});
        break;
    }

    var s3Params = {
      Bucket: process.env.AWS_S3_BUCKET + '/' + path,
      Key: avatarName,
      Body: buffer,
      ContentType: matches[1],
      ACL: 'public-read',
    };

    return S3Client.putObject(s3Params, function(err, data) {
      if (err) return done(err, null);
      return done(false, S3Client.endpoint.href + s3Params.Bucket + '/' + avatarName);
    });
  } catch (e) {
    return done(e, null);
  }
}
