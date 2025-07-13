const mongoose = require('mongoose');
const dotenv = require("dotenv") ;
dotenv.config() ;



const connectDB = async () => {

    console.log("dabse url : " , process.env.MONGO_URL) ;
    
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); 
  }
};

module.exports = connectDB;