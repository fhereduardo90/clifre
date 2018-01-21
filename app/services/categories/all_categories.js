const sequelize = require('../../models');
const errorParse = require('../../helpers/error_parse');
const ApiError = require('../../errors/api_error');
const CategoryDetailSerializer = require('../../serializers/categories/category_detail');

module.exports.call = async () => {
  try {
    const categories = await sequelize.Category.findAll();
    return {
      result: categories.map(c => CategoryDetailSerializer.serialize(c)),
      status: 200,
    };
  } catch (error) {
    throw new ApiError('Categories not found.', 404, errorParse(error));
  }
};
