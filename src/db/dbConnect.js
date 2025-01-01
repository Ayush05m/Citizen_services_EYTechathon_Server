import mongoose from 'mongoose';

export const dbConnect = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
};