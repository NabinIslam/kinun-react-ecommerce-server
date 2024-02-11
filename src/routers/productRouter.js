const express = require('express');
const {
  handleCreateProduct,
  handleGetProducts,
  handleGetProduct,
  handleDeleteProduct,
  handleUpdateProduct,
  handleGetProductsByCategory,
} = require('../controllers/productController');

const productRouter = express.Router();

productRouter.post('/', handleCreateProduct);
productRouter.get('/', handleGetProducts);
productRouter.get('/:slug', handleGetProduct);
productRouter.delete('/:id', handleDeleteProduct);
productRouter.put('/update/:id', handleUpdateProduct);
productRouter.get('/category/:slug', handleGetProductsByCategory);

module.exports = productRouter;
