const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      unique: true,
      minlength: [3, 'Category must be at least 3 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Category slug required'],
      lowercase: true,
      unique: true,
      
    },
  },
  { timestamps: true }
);

const Category = model('Category', categorySchema);

module.exports = Category;
