const Wishlist = require('../models/wishlistModel');

const handleAddToWishlist = async (req, res, next) => {
  try {
    const { user, product } = req.body;

    const alradyExists = await Wishlist.findOne({ user, product });

    if (alradyExists)
      return res.status(404).json({
        success: false,
        message: `The product is alraedy in wishlist`,
      });

    const addedProduct = await Wishlist.create({ user, product });

    if (!addedProduct)
      return res.status(404).json({
        success: false,
        message: `Could not add the product to wishlist`,
      });

    return res.status(200).json({
      success: true,
      message: `Product added to wishlist successfully`,
      addedProduct,
    });
  } catch (error) {
    next(error);
  }
};

const handleGetAllWishlist = async (req, res, next) => {
  try {
    const wishlist = await Wishlist.find({}).populate('product');

    if (!wishlist)
      return res.status(404).json({
        success: false,
        message: `Could not found wishlist products`,
      });

    return res.status(200).json({
      success: true,
      message: `Fetched all wishlist products successfully`,
      wishlist,
    });
  } catch (error) {
    next(error);
  }
};

const handleGetWishlistProductsByEmail = async (req, res, next) => {
  try {
    const { email } = req.params;

    const wishlist = await Wishlist.find({
      'user.email': email,
    }).populate('product');

    if (!wishlist)
      return res.status(404).json({
        success: false,
        message: `Could not found wishlist products of ${email}`,
      });

    return res.status(200).json({
      success: true,
      message: `Fetched the wishlist products of ${email} successfully`,
      wishlist,
    });
  } catch (error) {
    next(error);
  }
};

const handleRemoveWishlistProductbyEmail = async (req, res, next) => {
  try {
    const result = await Wishlist.findOneAndDelete();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleAddToWishlist,
  handleGetAllWishlist,
  handleGetWishlistProductsByEmail,
  handleRemoveWishlistProductbyEmail,
};
