const { Schema, model } = require('mongoose');

const wishlistSchema = new Schema(
  {
    user: {
      name: {
        type: String,
        required: [true, 'Category is required'],
        trim: true,
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
      },
      image: {
        type: String,
      },
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
  },
  { timestamps: true }
);

const Wishlist = model('Wishlist', wishlistSchema);

module.exports = Wishlist;
