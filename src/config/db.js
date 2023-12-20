const mongoose = require('mongoose');
require('dotenv').config();

const mongodbUri = process.env.MONGODB_URI;

const connectDB = async options => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, options);
    console.log('Database connection established');

    mongoose.connection.on('error', err =>
      console.error(`DB connection error: ${err}`)
    );
  } catch (error) {
    console.error(`Could not connect to Mongo ${error}`);
  }
};

module.exports = connectDB;
