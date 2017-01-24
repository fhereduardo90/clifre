// Libs
const Promise = require('bluebird');
// Helpers
const errorParse = require('../../helpers/error_parse');
// Serializers
const CardDetailSerializer = require('../../serializers/cards/card_detail');
// Others
const ApiError = require('../../errors/api_error');

/* eslint arrow-body-style: "off" */
module.exports.call = (company) => {
  return Promise.try(() => {
    try {
      return company.getCards({ order: '"createdAt" DESC' })
        .then(cards => ({
          result: cards.map((card) => {
            return CardDetailSerializer.serialize(card);
          }),
          status: 200,
        }))
        .catch((err) => {
          throw new ApiError('Card not be found.', 404, errorParse(err));
        });
    } catch (err) {
      throw new ApiError('Cards not found.', 404, errorParse(err));
    }
  });
};
