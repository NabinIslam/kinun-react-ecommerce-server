const express = require('express');
const {
  handleCreateProduct,
  handleGetProducts,
  handleGetProduct,
  handleDeleteProduct,
  handleUpdateProduct,
  handleGetProductsByCategory,
  handleGetProductById,
} = require('../controllers/productController');

const productRouter = express.Router();

productRouter.post('/', handleCreateProduct);
productRouter.get('/', handleGetProducts);
productRouter.get('/:slug', handleGetProduct);
productRouter.delete('/:id', handleDeleteProduct);
productRouter.put('/update/:id', handleUpdateProduct);
productRouter.get('/category/:slug', handleGetProductsByCategory);
productRouter.get('/id/:id', handleGetProductById);

module.exports = productRouter;
