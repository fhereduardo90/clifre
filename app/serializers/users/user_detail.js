module.exports = (function () {
  return {
    serialize: function serialize(user) {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        identifier: user.identifier,
        birthdate: user.birthdate,
        avatar: user.avatar,
        createdAt: user.createdAt
      };
    }
  };
})();
