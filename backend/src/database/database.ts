import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from '../logger';

dotenv.config(); 

const MONGO_URI = process.env.MONGO_URI || '';
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
       
        });
        logger.info('Connected to MongoDB Successully');
    } catch (error) {
        logger.error('Database connection failed:', error);
        process.exit(1); 
    }
};

export default connectDB;
