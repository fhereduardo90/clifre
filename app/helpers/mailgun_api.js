require('dotenv').config({silent: true});
var Promise = require('bluebird');

module.exports = (function (){
    var instance;

    function MailgunApi(apiKey, domain) {
      var _mailgun = require('mailgun-js')({apiKey: apiKey, domain: domain});
      instance = this;

      function setApiToken(ak) {
        _mailgun.apiKey = ak;
      }

      function getApiToken() {
        return _mailgun.apiKey;
      }

      function setDomain(dm) {
        _mailgun.domain = dm;
      }

      function getDomain() {
        return _mailgun.domain;
      }

      function send(data) {
        return new Promise(function sendMail(resolve, reject) {
          _mailgun.messages().send(data, function message(error, body) {
            if (error) return reject(error);
            return resolve(body);
          });
        });
      }

      return {
        setApiToken: setApiToken,
        getApiToken: getApiToken,
        setDomain: setDomain,
        getDomain: getDomain,
        send: send
      }
    }

    MailgunApi.init = function init(apiKey, domain) {
      if (instance) return instance;
      else return new MailgunApi(apiKey, domain);
    }
    return MailgunApi.init(process.env.MAILGUN_APIKEY, process.env.MAILGUN_DOMAIN);
})();
