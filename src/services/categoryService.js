const slugify = require('slugify');

const Category = require('../models/categoryModel');

const createCategory = async name => {
  const newCategory = await Category.create({
    name: name,
    slug: slugify(name),
  });

  return newCategory;
};

const getCategories = async () => await Category.find({});

const getCategory = async slug =>
  await Category.find({ slug }).select('name slug').lean();

const updateCategory = async (name, slug) => {
  const updateCategory = await Category.findOneAndUpdate(
    { slug },
    { $set: { name: name, slug: slugify(name) } },
    { new: true }
  );

  return updateCategory;
};

const deleteCategory = async slug => await Category.findOneAndDelete({ slug });

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
