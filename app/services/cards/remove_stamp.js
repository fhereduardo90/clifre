// Libs
const Promise = require('bluebird');
const _ = require('lodash');
// Helpers
const errorParse = require('../../helpers/error_parse');
// Others
const ApiError = require('../../errors/api_error');
const sequelize = require('../../models');
const FirebaseApi = require('../../helpers/firebase_api');

/* eslint arrow-body-style: "off" */
module.exports.call = (company, identifier) => {
  return Promise.try(() => {
    try {
      if (!company || !identifier) throw new Error('Parameters are incorrect.');

      let userFound;

      return sequelize.User.findOne({ where: { identifier } })
        .then((user) => {
          if (!user) throw new Error('User not found.');

          userFound = user;
          return sequelize.UserCard.findOne({
            where: { companyId: company.id, userId: user.id, redeemed: false },
            order: '"createdAt" DESC',
            include: [{ model: sequelize.Card }],
          });
        })
        .then((userCard) => {
          if (!userCard) {
            throw new Error('Card not found.');
          } else if (userCard.sealedDates.length === 0) {
            throw new Error('The user card does not have any stamp.');
          }

          userCard.sealedDates.pop();
          userCard.sealedDates = userCard.sealedDates.slice();
          return userCard.save();
        })
        .then(() => {
          sequelize.Device.findAll({ where: { userId: userFound.id }, attributes: ['registrationId'] })
            .then((devices) => {
              FirebaseApi.sendNotification(
                { title: 'Remove Stamp', body: 'Stamp Removed' },
                devices.map(d => d.registrationId)
              );
            });

          return { result: null, status: 204 };
        })
        .catch((err) => {
          throw new ApiError('Card Error.', 404, errorParse(err));
        });
    } catch (err) {
      throw new ApiError('Card Error.', 404, errorParse(err));
    }
  });
};

