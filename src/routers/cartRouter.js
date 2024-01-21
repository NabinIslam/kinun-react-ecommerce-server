const express = require('express');
const {
  handleAddToCart,
  handleRemoveFromCart,
  handleUpdateCart,
  handleGetCart,
  handleClearCart,
} = require('../controllers/cartController');

const cartRouter = express.Router();

cartRouter.post('/', handleAddToCart);
cartRouter.delete('/:id', handleRemoveFromCart);
cartRouter.put('/:id', handleUpdateCart);
cartRouter.get('/', handleGetCart);
cartRouter.delete('/', handleClearCart);

module.exports = cartRouter;
