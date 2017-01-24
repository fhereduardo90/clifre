const sequelize = require('../../models');
const errorParse = require('../../helpers/error_parse');
const ApiError = require('../../errors/api_error');
const UserDetailSerializer = require('../../serializers/users/user_detail');

/* eslint arrow-body-style: "off" */
module.exports.call = () => {
  return sequelize.User.findAll()
    .then((users) => {
      const result = users.map(user => UserDetailSerializer.serialize(user));
      return { result, status: 200 };
    })
    .catch(err => ApiError('Users not found.', 404, errorParse(err)));
};
