const express = require('express');
const { handleCreateUser } = require('../controllers/userController');

const userRouter = express.Router();

userRouter.post('/', handleCreateUser);

module.exports = userRouter;
