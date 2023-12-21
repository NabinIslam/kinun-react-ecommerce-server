require('dotenv').config();

const port = process.env.PORT || 3002;
const mongodbUri = process.env.MONGODB_URI;

module.exports = {
  port,
  mongodbUri,
};
