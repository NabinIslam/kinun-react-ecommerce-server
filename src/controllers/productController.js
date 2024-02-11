const slugify = require('slugify');
const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
const Brand = require('../models/brandModel');

const handleCreateProduct = async (req, res, next) => {
  try {
    const {
      name,
      description,
      shortDescription,
      price,
      image,
      category,
      brand,
      status,
    } = req.body;

    const productExists = await Product.exists({ name: name });

    if (productExists)
      return res.status(409).json({
        success: false,
        message: `Product with this name already exist.`,
      });

    const product = await Product.create({
      name,
      slug: slugify(name),
      description,
      shortDescription,
      price,
      image,
      category,
      brand,
      status,
    });

    return res.status(200).json({
      success: true,
      message: `Product created successfully`,
      product,
    });
  } catch (error) {
    next(error);
  }
};

const handleGetProducts = async (req, res, next) => {
  try {
    let sort = { createdAt: -1 };
    let filter = {};

    if (req.query.sort) {
      sort = req.query.sort;
    }

    const brandName = req.query.brand;

    if (brandName) {
      const brand = await Brand.findOne({ slug: brandName });

      filter = { brand: brand._id };
    }

    const categoryName = req.query.category;

    if (categoryName) {
      const category = await Category.findOne({ slug: categoryName });

      filter = { ...filter, category: category._id };
    }

    const products = await Product.find(filter)
      .populate('category')
      .populate('brand')
      .sort(sort);

    if (!products)
      return res
        .status(404)
        .json({ success: false, message: `Products not found` });

    return res.status(200).json({
      success: true,
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

    const product = await Product.findOne({ slug })
      .populate('category')
      .populate('brand');

    if (!product)
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });

    return res.status(200).json({
      success: true,
      message: `Returned a single product successfully`,
      product,
    });
  } catch (error) {
    next(error);
  }
};

const handleDeleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findOneAndDelete({ _id: id });

    if (!product)
      return res.status(404).json({
        success: false,
        message: `Could not delete the product`,
      });

    return res.status(200).json({
      success: true,
      message: `Deleted a single product successfully`,
    });
  } catch (error) {
    next(error);
  }
};

const handleUpdateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      shortDescription,
      price,
      image,
      category,
      brand,
      status,
    } = req.body;

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name,
          slug: slugify(name),
          description,
          shortDescription,
          price,
          image,
          category,
          brand,
          status,
        },
      },
      { new: true }
    )
      .populate('category')
      .populate('brand');

    return res.status(200).json({
      success: true,
      message: 'Product has updated successfully',
      updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

const handleGetProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({ _id: id })
      .populate('category')
      .populate('brand');

    if (!product)
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });

    return res.status(200).json({
      success: true,
      message: `Returned a single product successfully`,
      product,
    });
  } catch (error) {
    next(error);
  }
};

const handleGetProductsByCategory = async (req, res, next) => {
  try {
    let sort = { createdAt: -1 };
    let filter = {};

    const brandName = req.query.brand;

    if (brandName) {
      const brand = await Brand.findOne({ slug: brandName });

      filter = brand;
    }

    if (req.query.sort) {
      sort = req.query.sort;
    }

    const { slug } = req.params;

    const category = await Category.findOne({ slug });

    if (!category)
      return res
        .status(404)
        .json({ success: false, message: `Category not found` });

    const products = await Product.find({ category })
      .populate('category')
      .populate('brand')
      .sort(sort);

    if (!products)
      return res
        .status(404)
        .json({ success: false, message: `Products not found` });

    // if (req.query.sort) {
    //   const products = await Product.find({ category })
    //     .populate('category')
    //     .populate('brand')
    //     .sort(req.query.sort);

    //   return res.status(200).json({
    //     success: true,
    //     message: `${slug} products returned by price successfully`,
    //     products,
    //   });
    // }

    return res.status(200).json({
      success: true,
      message: `${slug} products returned successfully`,
      products,
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
  handleGetProductsByCategory,
  handleGetProductById,
};
