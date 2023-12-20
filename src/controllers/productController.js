const slugify = require('slugify');
const { updateProduct } = require('../services/productService');
const Product = require('../models/productModel');

const handleCreateProduct = async (req, res, next) => {
  try {
    const { name, description, price, image, category, status } = req.body;

    const productExists = await Product.exists({ name: name });

    if (productExists)
      return res
        .status(409)
        .json({ message: `Product with this name already exist.` });

    const product = await Product.create({
      name,
      slug: slugify(name),
      description,
      price,
      image,
      category,
      status,
    });

    return res.status(200).json({
      message: `Product created successfully`,
      product,
    });
  } catch (error) {
    next(error);
  }
};

const handleGetProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});

    return res.status(200).json({
      message: `Returned all products successfully`,
      products,
    });
  } catch (error) {
    next(error);
  }
};

const handleGetProduct = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const product = await Product.findOne({ slug }).populate('category');

    if (!product)
      return res.status(404).json({
        message: 'Product not found',
      });

    return res.status(200).json({
      message: `Returned a single product successfully`,
      product,
    });
  } catch (error) {
    next(error);
  }
};

const handleDeleteProduct = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const product = await Product.findOneAndDelete({ slug });

    if (!product)
      return res.status(404).json({
        message: `Product not found`,
      });

    return res.status(200).json({
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

    return res.status(200).json({
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
