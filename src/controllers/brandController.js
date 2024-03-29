const Brand = require('../models/brandModel');
const slugify = require('slugify');

const handleCreateBrand = async (req, res, next) => {
  try {
    const { name } = req.body;

    const brand = await Brand.create({
      name: name,
      slug: slugify(name),
    });

    if (!brand)
      return res
        .status(404)
        .json({ success: false, message: `Could not create the brand` });

    return res.status(200).json({
      success: true,
      message: `Brand created successfully`,
      brand,
    });
  } catch (error) {
    next(error);
  }
};

const handleGetBrands = async (req, res, next) => {
  try {
    const brands = await Brand.find({});

    if (!brands)
      return res
        .status(404)
        .json({ success: false, message: `Brands not found` });

    return res.status(200).json({
      success: true,
      message: `Brands fetched successfully`,
      brands,
    });
  } catch (error) {
    next(error);
  }
};

const handleGetBrand = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const brand = await Brand.find({ slug });

    if (!brand)
      return res.status(404).json({
        success: false,
        message: `Brand not found`,
      });

    return res.status(200).json({
      success: true,
      message: `Brand fetched successfully`,
      brand,
    });
  } catch (error) {
    next(error);
  }
};

const handleUpdateBrand = async (req, res, next) => {
  try {
    const { name } = req.body;
    const { slug } = req.params;

    const updatedBrand = await Brand.findOneAndUpdate(
      { slug },
      { $set: { name: name, slug: slugify(name) } },
      { new: true }
    );

    if (!updatedBrand)
      return res.status(404).json({
        success: false,
        message: `Could not update the brand`,
      });

    return res.status(200).json({
      success: true,
      message: `Brand updated successfully`,
      updatedBrand,
    });
  } catch (error) {
    next(error);
  }
};

const handleDeleteBrand = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Brand.findOneAndDelete({ _id: id });

    if (!result)
      return res.status(404).json({
        success: false,
        message: `Could not delete the brand`,
      });

    return res.status(200).json({
      success: true,
      message: `Brand deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleCreateBrand,
  handleGetBrands,
  handleGetBrand,
  handleUpdateBrand,
  handleDeleteBrand,
};
