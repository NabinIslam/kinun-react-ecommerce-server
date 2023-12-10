const slugify = require('slugify');
const Brand = require('../models/brandModel');

const createBrand = async name => {
  const newCategory = await Brand.create({
    name: name,
    slug: slugify(name),
  });

  return newCategory;
};

const getBrands = async () => await Brand.find({});

const getBrand = async slug =>
  await Brand.find({ slug }).select('name slug').lean();

const updateBrand = async (name, slug) => {
  const updateBrand = await Brand.findOneAndUpdate(
    { slug },
    { $set: { name: name, slug: slugify(name) } },
    { new: true }
  );

  return updateBrand;
};

const deleteBrand = async slug => await Brand.findOneAndDelete({ slug });

module.exports = {
  createBrand,
  getBrands,
  getBrand,
  updateBrand,
  deleteBrand,
};
