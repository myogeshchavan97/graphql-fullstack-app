const Subscription = {
  update: {
    subscribe(parent, args, ctx, info) {
      const { pubsub } = ctx;

      return pubsub.asyncIterator('update_user');
    }
  }
};

module.exports = Subscription;
