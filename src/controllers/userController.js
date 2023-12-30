const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const handleCreateUser = async (req, res, next) => {
  try {
    const { name, email, password, image } = req.body;

    const userExists = await User.findOne({ email: email });

    if (userExists)
      return res.status(400).json({ message: `User already exists` });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      image,
    });

    return res.status(200).json({ message: `User created successfully`, user });
  } catch (error) {
    next(error);
  }
};

module.exports = { handleCreateUser };
