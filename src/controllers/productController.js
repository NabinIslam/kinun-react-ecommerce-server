const createError = require('http-errors');
const { successResponse } = require('./responseController');
const { findWithId } = require('../services/findItem');
const Product = require('../models/productModel');
const slugify = require('slugify');
const {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
} = require('../services/productService');

const handleCreateProduct = async (req, res, next) => {
  try {
    const { name, description, price, quantity, shipping, category } = req.body;

    const image = req.file;

    if (!image) throw createError(400, 'Image file is required');

    if (image.size > 1024 * 1024 * 2)
      throw createError(400, 'Image is too large. It must be less than 2 mb.');

    const imageBufferString = image.buffer.toString('base64');

    const productData = {
      name,
      description,
      price,
      quantity,
      shipping,
      category,
      imageBufferString,
    };

    const product = await createProduct(productData);

    return successResponse(res, {
      statusCode: 200,
      message: `Product created successfully`,
      payload: product,
    });
  } catch (error) {
    next(error);
  }
};

const handleGetProducts = async (req, res, next) => {
  try {
    const search = req.query.search || '';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;

    const searchRegExp = new RegExp('.*' + search + '.*', 'i');

    const filter = {
      $or: [{ name: { $regex: searchRegExp } }],
    };

    const productsData = await getProducts(page, limit, filter);

    return successResponse(res, {
      statusCode: 200,
      message: `Returned all products successfully`,
      payload: {
        products: productsData.products,
        pagination: {
          totalPages: productsData.totalPages,
          currentPage: productsData.currentPage,
          previousPage: productsData.currentPage - 1,
          nextPage: productsData.currentPage + 1,
          totalNumberOfProducts: productsData.count,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const handleGetProduct = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const product = await getProduct(slug);

    return successResponse(res, {
      statusCode: 200,
      message: `Returned a single product successfully`,
      payload: product,
    });
  } catch (error) {
    next(error);
  }
};

const handleDeleteProduct = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const product = await deleteProduct(slug);

    return successResponse(res, {
      statusCode: 200,
      message: `Deleted a single product successfully`,
    });
  } catch (error) {
    next(error);
  }
};

const handleUpdateProduct = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const updateOptions = {
      new: true,
      runValidations: true,
      context: 'query',
    };

    let updates = {};

    const allowedFields = [
      'name',
      'description',
      'price',
      'sold',
      'quantity',
      'shipping',
    ];

    for (const key in req.body) {
      if (allowedFields.includes(key)) {
        updates[key] = req.body[key];
      }
      // else if (key === 'email') {
      //   throw createError(400, 'Email can not be updated');
      // }
    }

    const image = req.file;

    const updatedProduct = await updateProduct(
      slug,
      updates,
      image,
      updateOptions
    );

    return successResponse(res, {
      statusCode: 200,
      message: 'Product has updated successfully',
      payload: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleCreateProduct,
  handleGetProducts,
  handleGetProduct,
  handleDeleteProduct,
  handleUpdateProduct,
};
