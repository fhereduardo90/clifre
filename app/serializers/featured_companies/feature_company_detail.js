module.exports = (() => ({
  serialize: featuredCompany => ({
    id: featuredCompany.id,
    image: featuredCompany.image,
    createdAt: featuredCompany.createdAt,
  }),
}))();
