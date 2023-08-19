const { body } = require('express-validator');

const validateProduct = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Product name is required')
    .isLength({ min: 3, max: 150 })
    .withMessage('Product name should be between 3 to 150 characters'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 3 })
    .withMessage('Description should be minimum 3 characters'),

  body('price')
    .trim()
    .notEmpty()
    .withMessage('Price is required')
    .isLength({ min: 0 })
    .withMessage('Price must be a positive number'),

  body('category').trim().notEmpty().withMessage('Category is required'),

  body('quantity')
    .trim()
    .notEmpty()
    .withMessage('Quantity is required')
    .isLength({ min: 0 })
    .withMessage('Quantity must be a positive number'),
];

module.exports = {
  validateProduct,
};
