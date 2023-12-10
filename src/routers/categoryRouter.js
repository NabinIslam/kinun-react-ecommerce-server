const express = require('express');
const {
  handleCreateCategory,
  handleGetCategories,
  handleGetCategory,
  handleUpdateCategory,
  handleDeleteCategory,
} = require('../controllers/categoryController');

const categoryRouter = express.Router();

categoryRouter.post('/', handleCreateCategory);

categoryRouter.get('/', handleGetCategories);
categoryRouter.get('/:slug', handleGetCategory);
categoryRouter.put('/:slug', handleUpdateCategory);
categoryRouter.delete('/:slug', handleDeleteCategory);

module.exports = categoryRouter;
