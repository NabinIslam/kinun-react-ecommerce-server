const {
  createBrand,
  getBrands,
  getBrand,
  updateBrand,
  deleteBrand,
} = require('../services/brandService');
const { successResponse } = require('./responseController');
const createError = require('http-errors');

const handleCreateBrand = async (req, res, next) => {
  try {
    const { name } = req.body;

    await createBrand(name);

    return successResponse(res, {
      statusCode: 200,
      message: `Brand created successfully`,
    });
  } catch (error) {
    next(error);
  }
};

const handleGetBrands = async (req, res, next) => {
  try {
    const brands = await getBrands();

    return successResponse(res, {
      statusCode: 200,
      message: `Brands fetched successfully`,
      payload: brands,
    });
  } catch (error) {
    next(error);
  }
};

const handleGetBrand = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const brand = await getBrand(slug);

    if (!brand) {
      throw createError(404, 'Brand not found');
    }

    return successResponse(res, {
      statusCode: 200,
      message: `Categories fetched successfully`,
      payload: brand,
    });
  } catch (error) {
    next(error);
  }
};

const handleUpdateBrand = async (req, res, next) => {
  try {
    const { name } = req.body;
    const { slug } = req.params;

    const updatedBrand = await updateBrand(name, slug);

    if (!updatedBrand) {
      throw createError(404, 'Brand not found');
    }

    return successResponse(res, {
      statusCode: 200,
      message: `Brand updated successfully`,
      payload: updatedBrand,
    });
  } catch (error) {
    next(error);
  }
};

const handleDeleteBrand = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const result = await deleteBrand(slug);

    if (!result) {
      throw createError(404, 'Brand not found');
    }

    return successResponse(res, {
      statusCode: 200,
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
