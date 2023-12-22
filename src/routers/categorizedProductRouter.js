const express = require('express');
const {
  handleGetCategorizedProducts,
} = require('../controllers/categorizedProductController');
const categorizedProductRouter = express.Router();

categorizedProductRouter.get('/:slug', handleGetCategorizedProducts);

module.exports = categorizedProductRouter;
