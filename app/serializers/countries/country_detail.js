module.exports = {
  serialize: (country = {}) => ({
    id: country.id,
    name: country.name,
    createdAt: country.createdAt,
  }),
};
