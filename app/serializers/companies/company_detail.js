module.exports = (() => ({
  serialize: company => ({
    id: company.id,
    name: company.name,
    email: company.email,
    identifier: company.identifier,
    about: company.about,
    address: company.address,
    phone: company.phone,
    avatar: company.avatar,
    facebookPage: company.facebookPage,
    instagram: company.instagram,
    web: company.web,
    createdAt: company.createdAt,
  }),
}))();
