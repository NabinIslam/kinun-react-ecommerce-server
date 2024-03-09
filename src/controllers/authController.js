const bcryptjs = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../secret');

const handleSignUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const alreadyExists = await User.findOne({ email });

    if (alreadyExists)
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
};

const handleSignIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const validUser = await User.findOne({ email });

    if (!validUser)
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword)
      return res.status(401).json({
        success: false,
        message: 'Wrong credential',
      });

    const token = jwt.sign({ id: validUser._id }, jwtSecret);

    const { password: hashedPassword, ...rest } = validUser._doc;

    const expiryDate = new Date(Date.now() + 3600000); //1 hour

    return res
      .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

const handleSignOut = async (req, res, next) =>
  res.clearCookie('access_token').status(200).json('Signout successful!');

module.exports = { handleSignUp, handleSignIn, handleSignOut };
