const express = require('express');

const runValidations = require('../validators');
const {
  handleLogin,
  handleLogout,
  handleRefreshToken,
  handleProtectedRoute,
} = require('../controllers/authController');
const { isLoggedOut, isLoggedIn } = require('../middlewares/auth');
const { validateUserLogin } = require('../validators/auth');

const authRouter = express.Router();

authRouter.post(
  '/login',
  validateUserLogin,
  runValidations,
  isLoggedOut,
  handleLogin
);
authRouter.post('/logout', isLoggedIn, handleLogout);
authRouter.get('/refresh-token', handleRefreshToken);
authRouter.get('/protected', handleProtectedRoute);

module.exports = authRouter;
