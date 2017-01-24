// Libs
const _ = require('lodash');
const Promise = require('bluebird');
// Helpers
const errorParse = require('../../helpers/error_parse');
// Serializer
const CardDetailSerializer = require('../../serializers/cards/card_detail');
// Others
const ApiError = require('../../errors/api_error');

/* eslint arrow-body-style: "off" */
module.exports.call = (company, id) => {
  return Promise.try(() => {
    try {
      if (!id || !Number.isInteger(id)) throw new Error('Parameters are incorrect.');
      return company.getCards({ where: { id } })
        .then((cards) => {
          if (_.isEmpty(cards)) throw new Error('Card not found.');
          return {
            result: CardDetailSerializer.serialize(cards[0]),
            status: 200,
          };
        })
        .catch((err) => {
          throw new ApiError('Card not found.', 404, errorParse(err));
        });
    } catch (err) {
      throw new ApiError('Card not found.', 404, errorParse(err));
    }
  });
};
