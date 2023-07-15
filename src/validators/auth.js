const { body } = require('express-validator');

// registration validations
const validateUserRegistration = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 3, max: 30 })
    .withMessage('Name should be between 3 and 30 characters'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address'),

  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password should be at least 6 characters')
    .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\D)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    .withMessage(
      'Password should contain at least one uppercase, one lowercase character, one number and one special character.'
    ),

  body('address')
    .trim()
    .notEmpty()
    .withMessage('Address is required')
    .isLength({ min: 3 })
    .withMessage('Address should be at least 3 characters'),

  body('phone').trim().notEmpty().withMessage('Phone is required'),

  body('image')
    .custom((value, { req }) => {
      if (!req.file || !req.file.buffer)
        throw new Error('Please upload an image');

      return true;
    })
    .withMessage('Image is required'),
];

const validateUserLogin = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address'),

  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password should be at least 6 characters')
    .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\D)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    .withMessage(
      'Password should contain at least one uppercase, one lowercase character, one number and one special character.'
    ),
];

const validateUserPasswordUpdate = [
  body('oldPassword')
    .trim()
    .notEmpty()
    .withMessage('Old password is required')
    .isLength({ min: 6 })
    .withMessage('Old password should be at least 6 characters')
    .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\D)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    .withMessage(
      'Password should contain at least one uppercase, one lowercase character, one number and one special character.'
    ),

  body('newPassword')
    .trim()
    .notEmpty()
    .withMessage('New password is required')
    .isLength({ min: 6 })
    .withMessage('New password should be at least 6 characters')
    .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\D)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    .withMessage(
      'Password should contain at least one uppercase, one lowercase character, one number and one special character.'
    ),

  body('confirmedPassword').custom((value, { req }) => {
    if (value !== req.body.newPassword)
      throw new Error('Password did not match');

    return true;
  }),
];

const validateUserForgetPassword = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address'),
];

const validateUserResetPassword = [
  body('token').trim().notEmpty().withMessage('Token is required'),

  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password should be at least 6 characters')
    .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\D)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    .withMessage(
      'Password should contain at least one uppercase, one lowercase character, one number and one special character.'
    ),
];



// sign in validations

module.exports = {
  validateUserRegistration,
  validateUserLogin,
  validateUserPasswordUpdate,
  validateUserForgetPassword,
  validateUserResetPassword,
};
