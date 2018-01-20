module.exports = {
  serialize: (category = {}) => ({
    id: category.id,
    name: category.name,
    createdAt: category.createdAt,
  }),
};
