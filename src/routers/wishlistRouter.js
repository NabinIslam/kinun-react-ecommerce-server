const express = require('express');
const {
  handleAddToWishlist,
  handleGetAllWishlist,
  handleGetWishlistProductsByEmail,
} = require('../controllers/wishlistController');

const wishlistRouter = express.Router();

wishlistRouter.post('/', handleAddToWishlist);
wishlistRouter.get('/', handleGetAllWishlist);
wishlistRouter.get('/:email', handleGetWishlistProductsByEmail);

module.exports = wishlistRouter;
