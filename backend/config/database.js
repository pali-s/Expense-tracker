const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const database = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGODB_URI, {});
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

module.exports = database;