require('dotenv').config({silent: true});
const Promise = require('bluebird');
const fcm = require('node-gcm');

class FirebaseApi {
  constructor(apiKey) {
    this.sender = new fcm.Sender(apiKey);
  }

  buildMessage(notification, data) {
    return new fcm.Message({
      notification,
      data,
    });
  }

  sendNotification(notification = {}, data = {}, registrationIds = []) {
    const message = this.buildMessage(notification, data);

    return new Promise((resolve, reject) => {
      this.sender.send(
        message,
        {registrationTokens: registrationIds},
        (err, response) => {
          if (err) {
            return reject(err);
          }
          return resolve(response);
        }
      );
    });
  }
}

module.exports = Object.freeze(
  new FirebaseApi(process.env.FIREBASE_CLOUD_MESSAGING_KEY)
);
