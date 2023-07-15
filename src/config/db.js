const mongoose = require('mongoose');
const { mongodbUri } = require('../secret');

const connectDB = async options => {
  try {
    await mongoose.connect(mongodbUri, options);
    console.log('Database connection established');

    mongoose.connection.on('error', err =>
      console.error(`DB connection error: ${err}`)
    );
  } catch (error) {
    console.error(`Could not connect to Mongo ${error.toString()}`);
  }
};

module.exports = connectDB;
