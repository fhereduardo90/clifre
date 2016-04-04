require('dotenv').load();
var AWS = require('aws-sdk');

function S3Client () {
  AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });
  return new AWS.S3();
}

module.exports = S3Client();
