module.exports = (function () {
  return {
    serialize: function serialize(userCard) {
      return {
        id: userCard.id,
        sealedDates: userCard.sealedDates,
        createdAt: userCard.createdAt
      };
    }
  };
})();
