const express = require('express');
const {
  handleSignUp,
  handleSignIn,
  handleSignOut,
} = require('../controllers/authController');

const authRouter = express.Router();

authRouter.post('/signup', handleSignUp);
authRouter.post('/signin', handleSignIn);
authRouter.get('/signout', handleSignOut);

module.exports = authRouter;
