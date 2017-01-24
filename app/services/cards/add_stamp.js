// Libs
const Promise = require('bluebird');
// Helpers
const errorParse = require('../../helpers/error_parse');
// Others
const ApiError = require('../../errors/api_error');
const sequelize = require('../../models');
const FirebaseApi = require('../../helpers/firebase_api');
// Services
const CreateUserCardService = require('../user_cards/create_user_card');

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
          if (userCard) return Promise.resolve(userCard);
          return CreateUserCardService.call(company, identifier);
        })
        .then((userCard) => {
          if (!userCard) throw new Error('User Card not found.');

          if (userCard.sealedDates.length >= userCard.Card.stamps) {
            throw new Error('The card has reached its stamps limit.');
          }

          userCard.sealedDates = userCard.sealedDates.concat([Date.now()]).slice();
          return userCard.save();
        })
        .then(() => {
          sequelize.Device.findAll({ where: { userId: userFound.id }, attributes: ['registrationId'] })
            .then((devices) => {
              FirebaseApi.sendNotification(
                { title: 'Add Stamp', body: 'Stamp Added' },
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