const express = require('express');

const runValidations = require('../validators');
const { isLoggedIn, isLoggedOut, isAdmin } = require('../middlewares/auth');
const {
  handleCreateCategory,
  handleGetCategories,
  handleGetCategory,
  handleUpdateCategory,
  handleDeleteCategory,
} = require('../controllers/categoryController');
const { validateCategory } = require('../validators/category');

const categoryRouter = express.Router();

categoryRouter.post(
  '/',
  // validateCategory,
  // runValidations,
  // isLoggedIn,
  // isAdmin,
  handleCreateCategory
);

categoryRouter.get('/', handleGetCategories);
categoryRouter.get('/:slug', handleGetCategory);
categoryRouter.put(
  '/:slug',
  // validateCategory,
  // runValidations,
  // isLoggedIn,
  // isAdmin,
  handleUpdateCategory
);
categoryRouter.delete(
  '/:slug',
  // isLoggedIn, isAdmin,
  handleDeleteCategory
);

module.exports = categoryRouter;
