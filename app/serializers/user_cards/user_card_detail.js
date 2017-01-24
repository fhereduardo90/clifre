module.exports = (() => ({
  serialize: userCard => ({
    id: userCard.id,
    sealedDates: userCard.sealedDates,
    createdAt: userCard.createdAt,
    redeemed: userCard.redeemed,
  }),
}))();
