const express = require('express');
const {
  handleCreateBrand,
  handleGetBrand,
  handleUpdateBrand,
  handleDeleteBrand,
  handleGetBrands,
} = require('../controllers/brandController');

const brandRouter = express.Router();

brandRouter.post('/', handleCreateBrand);

brandRouter.get('/', handleGetBrands);
brandRouter.get('/:slug', handleGetBrand);
brandRouter.put('/:slug', handleUpdateBrand);
brandRouter.delete('/:slug', handleDeleteBrand);

module.exports = brandRouter;
