// Libs
const _ = require('lodash');
// Helpers
const errorParse = require('../../helpers/error_parse');
// Others
const ApiError = require('../../errors/api_error');
const sequelize = require('../../models');
const FirebaseApi = require('../../helpers/firebase_api');
// Services
const CreateUserCard = require('../user_cards/create_user_card');

module.exports.call = (company, userId) => {
  return new Promise((resolve, reject) => {
    try {
      if (!_.isObject(company) || !userId) {
        throw new Error('Parameters are incorrect.');
      }
      return sequelize.UserCard.findOne({
        where: { companyId: company.id, userId: userId },
        attributes: ['id', 'sealedDates', 'createdAt'],
        order: `"createdAt" DESC`,
        include: [{model: sequelize.Card, attributes: ['stamps']}]
      }).then(userCard => {
        if (userCard) return Promise.resolve(userCard)
        else return CreateUserCard.call(company, userId);
      }).then(userCard => {
        if (!userCard) throw new Error('User Card not found.');

        if (userCard.sealedDates.length >= userCard.Card.stamps) {
          throw new Error('The card has reached its stamps limit.');
        }
        userCard.sealedDates = userCard.sealedDates.concat([Date.now()]).slice();
        return userCard.save();
      }).then(() => {
        sequelize.Device.findAll({ where: { userId }, attributes: ['registrationId'] })
          .then((devices)  => {
            FirebaseApi.sendNotification(
              {title: 'Add Stamp', body: 'Stamp Added'},
              devices.map(d => d.registrationId)
            );
          });
        return {status: 204};
      }).catch(err => {
        reject(new ApiError('New stamp could not be added.', 422, errorParse(err)));
      });
    } catch (e) {
      reject(new ApiError('New stamp could not be added.', 422, errorParse(e)));
    }
  });
};
