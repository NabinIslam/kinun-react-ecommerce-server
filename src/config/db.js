require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongodbUri = process.env.MONGODB_URI;

    await mongoose.connect(mongodbUri);
    console.log('Database connection established');

    mongoose.connection.on('error', err =>
      console.error(`DB connection error: ${err}`)
    );
  } catch (error) {
    console.error(`Could not connect to Mongo ${error}`);
  }
};

module.exports = connectDB;
