// Libs
const _ = require('lodash');
const Promise = require('bluebird');
// Helpers
const errorParse = require('../../helpers/error_parse');
// Others
const ApiError = require('../../errors/api_error');

/* eslint arrow-body-style: "off" */
module.exports.call = (company, id, params) => {
  return Promise.try(() => {
    try {
      if (!id || !Number.isInteger(id))
        throw new Error('Parameters are incorrect.');
      return company
        .getCards({ where: { id } })
        .then(cards => {
          if (_.isEmpty(cards)) throw new Error('Card not found.');
          return cards[0].update(params);
        })
        .then(() => ({ result: null, status: 204 }))
        .catch(err => {
          throw new ApiError(
            'Card could not be updated.',
            422,
            errorParse(err),
          );
        });
    } catch (err) {
      throw new ApiError('Card could not be updated.', 422, errorParse(err));
    }
  });
};
