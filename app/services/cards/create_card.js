// Libs
const _ = require('lodash');
// Helpers
const errorParse = require('../../helpers/error_parse');
// Others
const ApiError = require('../../errors/api_error');
const Promise = require('bluebird');

/* eslint arrow-body-style: "off" */
module.exports.call = (company, params) => {
  return Promise.try(() => {
    try {
      /* eslint-disable no-param-reassign */
      params.companyId = company.id;
      /* eslint-disable no-param-reassign */
      return company.createCard(params)
        .then(() => ({ result: null, status: 204 }))
        .catch((err) => {
          throw new ApiError('Card could not be created.', 422, errorParse(err));
        });
    } catch (err) {
      throw new ApiError('Card could not be created.', 422, errorParse(err));
    }
  });
};
