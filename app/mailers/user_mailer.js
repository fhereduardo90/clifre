require('dotenv').config({silent: true});
var Promise = require('bluebird');
var MailgunApi = require('../helpers/mailgun_api');
var sequelize = require('../models');

// Private Properties
var fromEmail = process.env.MAILGUN_EMAIL;

module.exports = {
  welcomeMail: function welcomeMail(userId) {
    sequelize.User.findById(userId, {attributes: ['id', 'email']})
      .then(function success(user) {
        if (!user) throw new Error('User not found.');
        var data = {
          from: 'Clifre <'+ fromEmail +'>',
          to: user.email,
          subject: 'Welcome to Clifre!',
          text: 'Welcome, your account has been created successfully!'
        };
        return MailgunApi.send(data);
      })
      .catch(function error(err) {
        throw err;
      })
  }
}
