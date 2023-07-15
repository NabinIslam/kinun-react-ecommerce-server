const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const { jwtAccessKey } = require('../secret');

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) throw createError(401, 'Access token not found. Please login');

    const decoded = jwt.verify(token, jwtAccessKey);

    if (!decoded) throw createError(401, 'Invalid access token. Please login');

    req.user = decoded.user;

    next();
  } catch (error) {
    next(error);
  }
};

const isLoggedOut = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (token) throw createError(400, 'User is already logged in');

    next();
  } catch (error) {
    next(error);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    if (!req.user.isAdmin)
      throw createError(
        403,
        'Forbidden. You must be an administrator to access this resource'
      );

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { isLoggedIn, isLoggedOut, isAdmin };
