module.exports = (() => ({
  serialize: card => ({
    id: card.id,
    stamps: card.stamps,
    color: card.color,
    description: card.description,
    title: card.title,
    createdAt: card.createdAt,
  }),
}))();
