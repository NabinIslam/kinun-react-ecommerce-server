const express = require('express');
const {
  handleCreateUser,
  handleGetAllUsers,
  handleGetUserByEmail,
} = require('../controllers/userController');

const userRouter = express.Router();

userRouter.post('/', handleCreateUser);
userRouter.get('/', handleGetAllUsers);
userRouter.get('/:email', handleGetUserByEmail);

module.exports = userRouter;
