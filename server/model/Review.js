const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    comment: {
      type: String,
      required: true
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Product'
    }
  },
  {
    timestamps: true
  }
);

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
