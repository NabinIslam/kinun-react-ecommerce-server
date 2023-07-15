const express = require('express');
const {
  handleGetUsers,
  handleGetUserById,
  handleDeleteUserById,
  handleProcessRegister,
  handleActivateUserAccount,
  handleUpdateUserById,
  handleBanUserById,
  handleUnbanUserById,
  handleUpdatePassword,
  handleForgetPassword,
  handleResetPassword,
} = require('../controllers/userController');
const upload = require('../middlewares/uploadFile');
const {
  validateUserRegistration,
  validateUserPasswordUpdate,
  validateUserForgetPassword,
  validateUserResetPassword,
} = require('../validators/auth');
const runValidations = require('../validators');
const { isLoggedIn, isLoggedOut, isAdmin } = require('../middlewares/auth');

const userRouter = express.Router();

userRouter.post(
  '/process-register',
  isLoggedOut,
  upload.single('image'),
  validateUserRegistration,
  runValidations,
  handleProcessRegister
);
userRouter.get('/', isLoggedIn, isAdmin, handleGetUsers);
userRouter.get('/:id([0-9a-fA-F]{24})', isLoggedIn, handleGetUserById);
userRouter.post('/activate', isLoggedOut, handleActivateUserAccount);
userRouter.put(
  '/reset-password/',
  validateUserResetPassword,
  runValidations,
  handleResetPassword
);
userRouter.put(
  '/:id([0-9a-fA-F]{24})',
  isLoggedIn,
  upload.single('image'),
  handleUpdateUserById
);
userRouter.delete('/:id([0-9a-fA-F]{24})', isLoggedIn, handleDeleteUserById);
userRouter.put(
  '/ban-user/:id([0-9a-fA-F]{24})',
  isLoggedIn,
  isAdmin,
  handleBanUserById
);
userRouter.put(
  '/unban-user/:id([0-9a-fA-F]{24})',
  isLoggedIn,
  isAdmin,
  handleUnbanUserById
);
userRouter.put(
  '/update-password/:id([0-9a-fA-F]{24})',
  validateUserPasswordUpdate,
  runValidations,
  isLoggedIn,
  handleUpdatePassword
);
userRouter.post(
  '/forget-password/',
  validateUserForgetPassword,
  runValidations,
  handleForgetPassword
);

module.exports = userRouter;
