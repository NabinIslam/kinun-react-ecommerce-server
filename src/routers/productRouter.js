const express = require('express');
const {
  handleCreateProduct,
  handleGetProducts,
  handleGetProduct,
  handleDeleteProduct,
  handleUpdateProduct,
} = require('../controllers/productController');

const productRouter = express.Router();

productRouter.post('/', handleCreateProduct);

productRouter.get('/', handleGetProducts);

// GET -> /api/products/:slug -> get single product
productRouter.get('/:slug', handleGetProduct);

productRouter.delete('/:slug', handleDeleteProduct);

productRouter.put('/:slug', handleUpdateProduct);

module.exports = productRouter;
