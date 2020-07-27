const _ = require('lodash');
const Product = require('../../model/Product');
const Review = require('../../model/Review');
const { getMessage } = require('../utils/functions');

const Query = {
  async products() {
    try {
      let products = await Product.find({});
      products = _.orderBy(products, ['updatedAt'], ['desc']);
      return products;
    } catch (error) {
      throw new Error('Error while getting list of products. Try again later.');
    }
  },
  async reviews(parent, args, ctx, info) {
    try {
      const { skuId } = args;
      const product = await Product.findOne({ skuId });
      if (!product) {
        throw new Error(`Message:Product with skuId ${skuId} does not exist.`);
      }
      let reviews = await Review.find({ product: product._id });
      reviews = _.orderBy(reviews, ['updatedAt'], ['desc']);

      return reviews;
    } catch (error) {
      const message = error.message;
      if (message.startsWith('Message')) {
        throw new Error(getMessage(message));
      } else {
        throw new Error('Error while getting reviews. Try again later.');
      }
    }
  }
};

module.exports = Query;
