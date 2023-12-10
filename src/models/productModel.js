const { Schema, model } = require('mongoose');

// name, slug, description, price, quantity, sold, shipping, image
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      minlength: [3, 'Product name must be at least 3 characters'],
      maxlength: [150, 'Product name can be maximum 150 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Product slug required'],
      lowercase: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Product description required'],
      trim: true,
      unique: true,
      minlength: [3, 'Product description must be at least 3 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      trim: true,
      validate: {
        validator: v => v > 0,
        message: props =>
          `${props.value} is not a valid price! Price must be greater than 0`,
      },
    },
    image: {
      type: String,
      required: [true, 'Product image is required'],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    status: {
      type: String,
      required: [true, 'Product status is required'],
    }
  },
  { timestamps: true }
);

const Product = model('Product', productSchema);

module.exports = Product;
