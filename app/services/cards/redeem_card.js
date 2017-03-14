// Libs
const Promise = require('bluebird');
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
      let currentUserCard;

      return sequelize.User.findOne({ where: { identifier } })
        .then((user) => {
          if (!user) throw new Error('User not found.');

          userFound = user;
          return sequelize.UserCard.findOne({
            where: { companyId: company.id, userId: user.id },
            order: '"createdAt" DESC',
            include: [{ model: sequelize.Card }],
          });
        })
        .then((userCard) => {
          if (!userCard) {
            throw new Error('User Card not found.');
          } else if (userCard.sealedDates.length < userCard.Card.stamps) {
            throw new Error('Card has not reached its stamps limit.');
          } else if (userCard.redeemed) {
            throw new Error('Card had already been redeemed.');
          }

          userCard.redeemed = true;
          currentUserCard = userCard;
          return userCard.save();
        })
        .then(() => {
          sequelize.Device.findAll({ where: { userId: userFound.id }, attributes: ['registrationId'] })
            .then((devices) => {
              FirebaseApi.sendNotification(
                { title: 'Tarjeta canjeada', body: 'Tu tarjeta de ' + company.name + ' ha sido canjeada!', cardId: currentUserCard.id},
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
