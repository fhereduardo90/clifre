// Libs
var Promise = require('bluebird');
var _ = require('lodash');
// Helpers
var errorParse = require('../../helpers/error_parse');
// Others
var ApiError = require('../../errors/api_error');
var sequelize = require('../../models');
var FirebaseApi = require('../../helpers/firebase_api');

var CreateUserCard = require('../user_cards/create_user_card');

// module.exports.call = function(company, userId, id) {
  module.exports.call = function(company, userId) {
  return new Promise.try(function promise() {
    try {
      if (!_.isObject(company) || !userId) {
        throw new Error('Parameters are incorrect.');
      }

      return sequelize.UserCard.findOne({
        // where: {companyId: company.id, userId: userId, id: id },
        where: { companyId: company.id, userId: userId },
        attributes: ['id', 'sealedDates', 'createdAt'],
        order: '"createdAt" DESC',
        include: [{model: sequelize.Card, attributes: ['stamps']}]
      }).then(function success(userCard) {
        if (userCard) return Promise.resolve(userCard)
        else return CreateUserCard.call(company, userId);
      }).then(function success(userCard) {
        if (!userCard) throw new Error('User Card not found.');

        if (userCard.sealedDates.length >= userCard.Card.stamps) {
          throw new Error('The card has reached its stamps limit.');
        }
        userCard.sealedDates = userCard.sealedDates.concat([Date.now()]).slice();
        return userCard.save();
      }).then(function success() {
        sequelize.Device.findAll({ where: { userId: userId }, attributes: ['registrationId'] })
          .then(function (devices) {
            FirebaseApi.sendNotification(
              {title: 'Add Stamp', body: 'Stamp Added'},
              devices.map(function (d) {
                return d.registrationId;
              })
            );
          });

        return {result: null, status: 204};
      }).catch(function error(err) {
        throw new ApiError('New stamp could not be added.', 422, errorParse(err));
      });
    } catch (e) {
      throw new ApiError('New stamp could not be added.', 422, errorParse(e));
    }
  });
};
