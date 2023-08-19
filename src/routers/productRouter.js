const express = require('express');

const upload = require('../middlewares/uploadFile');

const runValidations = require('../validators');
const { isLoggedIn, isLoggedOut, isAdmin } = require('../middlewares/auth');
const { handleCreateProduct } = require('../controllers/productController');
const { validateProduct } = require('../validators/product');

const productRouter = express.Router();

productRouter.post(
  '/',
  upload.single('image'),
  validateProduct,
  runValidations,
  isLoggedIn,
  isAdmin,
  handleCreateProduct
);

module.exports = productRouter;
