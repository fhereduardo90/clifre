module.exports = (function () {
  return {
    serialize: function serialize(company) {
      return {
        id: company.id,
        name: company.name,
        email: company.email,
        identifier: company.identifier,
        about: company.about,
        address: company.address,
        phone: company.phone,
        avatar: company.avatar,
        createdAt: company.createdAt
      };
    }
  };
})();
