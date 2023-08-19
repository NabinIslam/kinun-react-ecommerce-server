const slugify = require('slugify');
const createError = require('http-errors');

const Product = require('../models/productModel');

const createProduct = async productData => {
  const {
    name,
    description,
    price,
    quantity,
    shipping,
    category,
    imageBufferString,
  } = productData;

  const productExists = await Product.exists({ name: name });

  if (productExists) {
    throw createError(409, 'Product with this name already exist.');
  }

  const product = await Product.create({
    name,
    slug: slugify(name),
    description,
    price,
    quantity,
    shipping,
    image: imageBufferString,
    category,
  });

  return product;
};

module.exports = { createProduct };
