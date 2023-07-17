const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { successResponse } = require('./responseController');
const { createJSONWebToken } = require('../helper/jsonWebToken');
const { jwtAccessKey, jwtRefreshKey } = require('../secret');
const {
  setAccessTokenCookie,
  setRefreshTokenCookie,
} = require('../helper/cookie');

const handleLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      throw createError(
        404,
        'User does not exist with this email address. Please register first'
      );

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) throw createError(401, 'Email/password mismatch');

    if (user.isBanned)
      throw createError(
        403,
        'You are banned. Please contact your administrator'
      );

    const userWithOutPassword = user.toObject();
    delete userWithOutPassword.password;

    const accessToken = createJSONWebToken({ user }, jwtAccessKey, '5m');

    setAccessTokenCookie(res, accessToken);

    const refreshToken = createJSONWebToken({ user }, jwtRefreshKey, '7d');

    setRefreshTokenCookie(res, refreshToken);

    return successResponse(res, {
      statusCode: 200,
      message: 'User logged in successfully',
      payload: { userWithOutPassword },
    });
  } catch (error) {
    next(error);
  }
};

const handleLogout = async (req, res, next) => {
  try {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    return successResponse(res, {
      statusCode: 200,
      message: 'User logged out successfully',
      payload: {},
    });
  } catch (error) {
    next(error);
  }
};

const handleRefreshToken = async (req, res, next) => {
  try {
    const oldRefreshToken = req.cookies.refreshToken;

    const decodedToken = jwt.verify(oldRefreshToken, jwtRefreshKey);

    if (!decodedToken)
      throw createError(401, 'Invalid refresh token. Please login again.');

    const accessToken = createJSONWebToken(
      decodedToken.user,
      jwtAccessKey,
      '5m'
    );
    
    setAccessTokenCookie(res, accessToken);

    return successResponse(res, {
      statusCode: 200,
      message: 'New access token is generated successfully',
      payload: {},
    });
  } catch (error) {
    next(error);
  }
};

const handleProtectedRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    const decodedToken = jwt.verify(accessToken, jwtAccessKey);

    if (!decodedToken)
      throw createError(401, 'Invalid access token. Please login again.');

    return successResponse(res, {
      statusCode: 200,
      message: 'Protected resource access successful',
      payload: {},
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleLogin,
  handleLogout,
  handleRefreshToken,
  handleProtectedRoute,
};
