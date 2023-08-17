const { body } = require('express-validator');

const validateCategory = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Category is required')
    .isLength({ min: 3 })
    .withMessage('Category should be between 3 characters'),
];

module.exports = {
  validateCategory,
};
