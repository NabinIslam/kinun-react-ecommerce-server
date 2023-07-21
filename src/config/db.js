const mongoose = require('mongoose');
const { mongodbUri } = require('../secret');
const logger = require('../controllers/loggerController');

const connectDB = async options => {
  try {
    await mongoose.connect(mongodbUri, options);
    logger.log('info', 'Database connection established');

    mongoose.connection.on('error', err =>
      logger.log('error', `DB connection error: ${err}`)
    );
  } catch (error) {
    logger.log('error', `Could not connect to Mongo ${error.toString()}`);
  }
};

module.exports = connectDB;
