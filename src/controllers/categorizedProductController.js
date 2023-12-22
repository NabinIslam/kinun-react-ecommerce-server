const Category = require('../models/categoryModel');
const Product = require('../models/productModel');

const handleGetCategorizedProducts = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const category = await Category.findOne({ slug: slug });

    const products = await Product.find({ category }).populate('category');

    return res.status(200).json({
      message: `Returned categoried product successfully`,
      products,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { handleGetCategorizedProducts };
