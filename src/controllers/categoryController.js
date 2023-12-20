const slugify = require('slugify');
const Category = require('../models/categoryModel');

const handleCreateCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    const newCategory = await Category.create({
      name: name,
      slug: slugify(name),
    });

    return res.status(200).json({
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

    return res.status(200).json({
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
        message: `Category not found`,
      });

    return res.status(200).json({
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
        message: `Category not found`,
      });

    return res.status(200).json({
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
        message: `Category not found`,
      });

    return res.status(200).json({
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
