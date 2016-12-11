'use strict';

require('dotenv').config({silent: true});
var Promise = require('bluebird');
var fcm = require('node-gcm');

module.exports = (function () {
  var instance;

  function FirebaseApi(apiKey) {
    instance = this;
    var sender = new fcm.Sender(apiKey);

    function buildMessage(data) {
      return new fcm.Message({
        data: data
      });
    }

    function sendNotification(data, registrationIds) {
      var message = buildMessage(data);
      return new Promise(function send(resolve, reject) {
        sender.send(message, {registrationTokens: registrationIds}, function done(err, response) {
          if (err) return reject(err);
          else return resolve(response);
        });
      });
    }

    return {
      buildMessage: buildMessage,
      sendNotification: sendNotification
    }
  }

  FirebaseApi.init = function init(apiKey) {
    if (instance) return instance;
    else return new FirebaseApi(apiKey);
  };

  return FirebaseApi.init(process.env.FIREBASE_CLOUD_MESSAGING_KEY);
})();
