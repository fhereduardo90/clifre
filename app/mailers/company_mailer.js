require('dotenv').config({silent: true});
var Promise = require('bluebird');
var MailgunApi = require('../helpers/mailgun_api');
var sequelize = require('../models');

// Private Properties
var fromEmail = process.env.MAILGUN_EMAIL;

module.exports = {
  welcomeMail: function welcomeMail(companyId) {
    sequelize.Company.findById(companyId, {attributes: ['id', 'email']})
      .then(function success(company) {
        if (!company) throw new Error('Company not found.');
        var data = {
          from: 'Clifre <'+ fromEmail +'>',
          to: company.email,
          subject: 'Welcome to Clifre!',
          text: 'Welcome, your account has been created successfully!'
        };
        return MailgunApi.send(data);
      })
      .catch(function error(err) {
        throw err;
      })
  },

  resetCompanyPassword: function resetCompanyPassword(token) {
    sequelize.Company.findOne({where: {resetPasswordToken: token}, attributes: ['id', 'email']})
      .then(function success(company) {
        if (!company) throw new Error('Company not found.');
        var data = {
          from: 'Clifre <'+ fromEmail +'>',
          to: company.email,
          subject: 'Reset Password Clifre',
          text: 'token: ' + token
        };
        return MailgunApi.send(data);
      })
      .catch(function error(err) {
        throw err;
      })
  }
}
