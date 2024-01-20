const { Schema, model } = require('mongoose');

const cartSchema = new Schema(
  {
    quantity: {
      type: Number,
      required: [true, 'Product quantity is required'],
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    user: {
      email: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

const Cart = model('Cart', cartSchema);

module.exports = Cart;
