module.exports = (function () {
  return {
    serialize: function serialize(card) {
      return {
        id: card.id,
        stamps: card.stamps,
        color: card.stamps,
        description: card.description,
        title: card.title,
        createdAt: card.createdAt
      };
    }
  };
})();
