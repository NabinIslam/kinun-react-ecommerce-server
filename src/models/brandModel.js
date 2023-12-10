const { Schema, model } = require('mongoose');

const brandSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Brand is required'],
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: [true, 'Brand slug required'],
      lowercase: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Brand = model('Brand', brandSchema);

module.exports = Brand;
