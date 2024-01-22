const Cart = require('../models/cartModel');

const handleAddToCart = async (req, res, next) => {
  try {
    const alreadyInCart = await Cart.findOne({
      'user.email': req.body.user.email,
      product: req.body.product,
    });

    if (alreadyInCart)
      return res
        .status(404)
        .json({ success: false, message: `This product is already in cart` });

    const cartData = new Cart({ ...req.body });

    const doc = await cartData.save();
    const cart = await doc.populate('product');

    if (!cart)
      return res
        .status(404)
        .json({ success: false, message: `Could not add the product to cart` });

    return res.status(200).json({
      success: true,
      message: `Product added to cart successfully`,
      cart,
    });
  } catch (error) {
    next(error);
  }
};

const handleRemoveFromCart = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Cart.findByIdAndDelete(id);

    if (!result)
      return res.status(404).json({
        success: false,
        message: `Could not remove the product from cart`,
      });

    return res.status(200).json({
      success: true,
      message: `Product removed from cart successfully`,
      result,
    });
  } catch (error) {
    next(error);
  }
};

const handleUpdateCart = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedCart = await Cart.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedCart)
      return res.status(404).json({
        success: false,
        message: `Could not update the cart`,
      });

    return res.status(200).json({
      success: true,
      message: `Cart updated successfully`,
      updatedCart,
    });
  } catch (error) {
    next(error);
  }
};

const handleGetCart = async (req, res, next) => {
  try {
    let filter = {};

    if (req.query.user) {
      filter = { 'user.email': req.query.user };
    }

    const cart = await Cart.find(filter).populate({
      path: 'product',
      populate: [{ path: 'category' }, { path: 'brand' }],
    });

    if (!cart)
      return res.status(404).json({
        success: false,
        message: `Cart not found`,
      });

    return res.status(200).json({
      success: true,
      message: `Cart fetched successfully`,
      cart,
    });
  } catch (error) {
    next(error);
  }
};

const handleClearCart = async (req, res, next) => {
  try {
    const result = await Cart.deleteMany({ 'user.email': req.query.user });

    if (!result)
      return res.status(404).json({
        success: false,
        message: `Could not clear the cart`,
      });

    return res.status(200).json({
      success: true,
      message: `Cart cleared successfully`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleAddToCart,
  handleRemoveFromCart,
  handleUpdateCart,
  handleGetCart,
  handleClearCart,
};
