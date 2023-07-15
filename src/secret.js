require('dotenv').config();

const port = process.env.PORT || 3002;
const mongodbUri = process.env.MONGODB_URI;
const defaultImgPath =
  process.env.DEAFULT_USER_IMAGE_PATH ||
  'public/images/images/users/default.png';
const jwtActivationKey =
  process.env.JWT_ACTIVATION_KEY || 'LOCMEWOMVMRVIOOQIOICEOON';
const jwtAccessKey = process.env.JWT_ACCESS_KEY || 'LOCMEWOMVMRVIOOQIOICEOON';
const jwtRefreshKey = process.env.JWT_REFRESH_KEY || 'LOCMEWOMVMRVIOOQIOICEOON';
const jwtResetPasswordKey =
  process.env.JWT_RESET_PASSWORD_KEY || 'LOCMEWOMVMRVIOOQIOICEOON';
const smtpUserName = process.env.SMTP_USERNAME || '';
const smtpPassword = process.env.SMTP_PASSWORD || '';
const clientUrl = process.env.CLIENT_URL || '';

module.exports = {
  port,
  mongodbUri,
  defaultImgPath,
  jwtActivationKey,
  smtpUserName,
  smtpPassword,
  clientUrl,
  jwtAccessKey,
  jwtResetPasswordKey,
  jwtRefreshKey,
};
