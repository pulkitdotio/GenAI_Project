const mongoose = require('mongoose');

async function connectDB() {
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI is not defined in environment variables');
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            autoIndex: process.env.NODE_ENV !== 'production'
        });

        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB');
        throw error;
    }
}

module.exports = connectDB;
