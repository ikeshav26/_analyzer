import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


export const connectDb=async()=>{
    try{
        console.log(process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connected successfully');
    }catch(err){
        console.error('Database connection error:', err);
    }
}