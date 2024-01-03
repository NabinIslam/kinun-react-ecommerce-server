const slugify = require('slugify');
const Category = require('../models/categoryModel');

const handleCreateCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    const newCategory = await Category.create({
      name: name,
      slug: slugify(name),
    });

    if (!newCategory)
      return res
        .status(404)
        .json({ success: false, message: `Could not create category` });

    return res.status(200).json({
      success: true,
      message: `Category created successfully`,
      newCategory,
    });
  } catch (error) {
    next(error);
  }
};

const handleGetCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({});

    if (!categories)
      return res
        .status(404)
        .json({ success: false, message: `Categories not found` });

    return res.status(200).json({
      success: true,
      message: `Categories fetched successfully`,
      categories,
    });
  } catch (error) {
    next(error);
  }
};

const handleGetCategory = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const category = await Category.find({ slug });

    if (!category)
      return res.status(404).json({
        success: false,
        message: `Category not found`,
      });

    return res.status(200).json({
      success: true,
      message: `Categories fetched successfully`,
      category,
    });
  } catch (error) {
    next(error);
  }
};

const handleUpdateCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const { slug } = req.params;

    const updatedCategory = await Category.findOneAndUpdate(
      { slug },
      { $set: { name: name, slug: slugify(name) } },
      { new: true }
    );

    if (!updatedCategory)
      return res.status(404).json({
        success: false,
        message: `Category not found`,
      });

    return res.status(200).json({
      success: true,
      message: `Category updated successfully`,
      updatedCategory,
    });
  } catch (error) {
    next(error);
  }
};

const handleDeleteCategory = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const result = await Category.findOneAndDelete({ slug });

    if (!result)
      return res.status(404).json({
        success: false,
        message: `Category not found`,
      });

    return res.status(200).json({
      success: true,
      message: `Category deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleCreateCategory,
  handleGetCategories,
  handleGetCategory,
  handleUpdateCategory,
  handleDeleteCategory,
};
