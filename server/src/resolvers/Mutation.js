const Product = require('../../model/Product');
const Review = require('../../model/Review');
const { getMessage } = require('../utils/functions');

const Mutation = {
  async addProduct(parent, args, ctx, info) {
    try {
      const { skuId } = args;
      const { name, description, price } = args.data;
      let product = await Product.find({ skuId });

      if (product.length > 0) {
        throw new Error(`Message:Product with skuId ${skuId} already exist.`);
      }

      product = new Product({
        skuId,
        name,
        description,
        price
      });

      await product.save();

      return product;
    } catch (error) {
      const message = error.message;
      if (message.startsWith('Message')) {
        throw new Error(getMessage(message));
      } else {
        throw new Error('Error while adding product. Try again later.');
      }
    }
  },
  async editProduct(parent, args, ctx, info) {
    try {
      const { skuId } = args;
      const { name, description, price } = args.data;
      let product = await Product.find({ skuId });

      if (product.length === 0) {
        throw new Error(`Message:Product with skuId ${skuId} does not exist.`);
      }

      product = await Product.findOneAndUpdate(
        { skuId },
        {
          name,
          description,
          price
        },
        {
          new: true
        }
      );

      return product;
    } catch (error) {
      const message = error.message;
      if (message.startsWith('Message')) {
        throw new Error(getMessage(message));
      } else {
        throw new Error('Error while editing product. Try again later.');
      }
    }
  },
  async deleteProduct(parent, args, ctx, info) {
    try {
      const { skuId } = args;
      const product = await Product.findOneAndDelete({ skuId });
      if (!product) {
        throw new Error(`Message:Product with skuId ${skuId} does not exist.`);
      }

      await Review.deleteMany({ product: product._id });

      return product;
    } catch (error) {
      const message = error.message;
      if (message.startsWith('Message')) {
        throw new Error(getMessage(message));
      } else {
        throw new Error('Error while deleting product. Try again later.');
      }
    }
  },
  async addReview(parent, args, ctx, info) {
    try {
      const { skuId } = args;
      const { title, comment } = args.data;
      const product = await Product.findOne({ skuId });
      if (!product) {
        throw new Error(`Message:Product with skuId ${skuId} does not exist.`);
      }
      const review = new Review({
        title,
        comment,
        product: product._id
      });

      await review.save();
      return review;
    } catch (error) {
      const message = error.message;
      if (message.startsWith('Message')) {
        throw new Error(getMessage(message));
      } else {
        throw new Error('Error while adding review. Try again later.');
      }
    }
  },
  async deleteReview(parent, args, ctx, info) {
    const { reviewId } = args;

    try {
      await Review.findByIdAndDelete(reviewId);
      return true;
    } catch (error) {
      throw new Error('Error while deleting review. Try again later.');
    }
  }
};

module.exports = Mutation;
