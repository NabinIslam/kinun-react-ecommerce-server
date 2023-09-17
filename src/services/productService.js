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

const getProducts = async (page = 1, limit = 4, filter = {}) => {
  const products = await Product.find(filter)
    .populate('category')
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });

  if (!products) throw createError(404, 'No products found');

  const count = await Product.find(filter).countDocuments();

  return {
    products,
    count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    previousPage: page - 1,
    nextPage: page + 1,
    
  };
};

const getProduct = async slug => {
  const product = await Product.findOne({ slug }).populate('category');

  if (!product) throw createError(404, 'No products found');

  return product;
};

const deleteProduct = async slug => {
  const product = await Product.findOneAndDelete({ slug });

  if (!product) throw createError(404, 'No products found');

  return product;
};

const updateProduct = async (slug, updates, image, updateOptions) => {
  if (updates.name) {
    updates.slug = slugify(updates.name);
  }

  if (image) {
    if (image.size > 1024 * 1024 * 2)
      throw createError(200, 'File is too large. It must be less than 2 mb.');

    updates.image = image.buffer.toString('base64');
  }

  const updatedProduct = await Product.findOneAndUpdate(
    { slug },
    updates,
    updateOptions
  );

  if (!updatedProduct)
    throw createError(404, 'Product with this slug does not exist.');

  return updatedProduct;
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
