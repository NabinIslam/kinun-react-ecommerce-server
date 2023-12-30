const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const handleCreateUser = async (req, res, next) => {
  try {
    const { name, email, password, image } = req.body;

    const userExists = await User.findOne({ email: email });

    if (userExists)
      return res
        .status(400)
        .json({ success: false, message: `User already exists` });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      image,
    });

    return res
      .status(200)
      .json({ success: true, message: `User created successfully`, user });
  } catch (error) {
    next(error);
  }
};

const handleGetAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});

    if (!users)
      return res
        .status(404)
        .json({ success: false, message: `Users not found` });

    return res.status(200).json({
      success: true,
      message: `Fetched all users successfully`,
      users,
    });
  } catch (error) {
    next(error);
  }
};

const handleGetUserByEmail = async (req, res, next) => {
  try {
    const { email } = req.params;

    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: `User not found` });

    return res
      .status(200)
      .json({ success: true, message: `Fetched user successfully`, user });
  } catch (error) {
    next(error);
  }
};

module.exports = { handleCreateUser, handleGetAllUsers, handleGetUserByEmail };
