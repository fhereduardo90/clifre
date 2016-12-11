// Libs
var Promise = require('bluebird');
var _ = require('lodash');
// Helpers
var errorParse = require('../../helpers/error_parse');
// Others
var ApiError = require('../../errors/api_error');
var sequelize = require('../../models');
var FirebaseApi = require('../../helpers/firebase_api');

module.exports.call = function(company, userId) {
  return new Promise.try(function promise() {
    try {

      if (!_.isObject(company) || !userId) {
        throw new Error('Parameters are incorrect.');
      }

      return sequelize.UserCard.findOne({
        // where: {companyId: company.id, userId: userId, id: id},
        where: { companyId: company.id, userId: userId },
        attributes: ['id', 'sealedDates', 'createdAt'],
        order: '"createdAt" DESC'
      }).then(function success(userCard) {
        if (!userCard) throw new Error('User Card not found.');
        if (userCard.sealedDates.length === 0) {
          throw new Error('The user card does not have any stamp.');
        }
        userCard.sealedDates.pop();
        userCard.sealedDates = userCard.sealedDates.slice();
        return userCard.save();
      }).then(function success() {
        sequelize.Device.findAll({ where: { userId: userId }, attributes: ['registrationId'] })
          .then(function (devices) {
            FirebaseApi.sendNotification(
              {title: 'Add Removed', body: 'Stamp Removed'},
              devices.map(function (d) {
                return d.registrationId;
              })
            );
          });

        return {result: null, status: 204};
      }).catch(function error(err) {
        throw new ApiError('Could not remove the stamp.', 422, errorParse(err));
      });
    } catch (e) {
      throw new ApiError('Could not remove the stamp.', 422, errorParse(e));
    }
  });
};
