const sequelize = require('../../models');
const errorParse = require('../../helpers/error_parse');
const ApiError = require('../../errors/api_error');
const CategoryDetailSerializer = require('../../serializers/categories/category_detail');

module.exports.call = async (id) => {
  try {
    const category = await sequelize.Category.findOne({ where: { id } });

    if (!category) {
      throw new Error('Category not found.');
    }

    return {
      result: CategoryDetailSerializer.serialize(category),
      status: 200,
    };
  } catch (error) {
    throw new ApiError('Category not found.', 404, errorParse(error));
  }
};
