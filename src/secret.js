require('dotenv').config();

const port = process.env.PORT || 3002;
const mongodbUri = process.env.MONGODB_URI;
const jwtActivationKey =
  process.env.JWT_ACTIVATION_KEY || 'LOCMEWOMVMRVIOOQIOICEOON';
const jwtAccessKey = process.env.JWT_ACCESS_KEY || 'LOCMEWOMVMRVIOOQIOICEOON';
const jwtRefreshKey = process.env.JWT_REFRESH_KEY || 'LOCMEWOMVMRVIOOQIOICEOON';
const jwtResetPasswordKey =
  process.env.JWT_RESET_PASSWORD_KEY || 'LOCMEWOMVMRVIOOQIOICEOON';
const clientUrl = process.env.CLIENT_URL || '';

module.exports = {
  port,
  mongodbUri,
  jwtActivationKey,
  clientUrl,
  jwtAccessKey,
  jwtResetPasswordKey,
  jwtRefreshKey,
};
