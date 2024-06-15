import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI as string;

let isConnected = false;

export const connectDB = async () => {
  mongoose.set('strictQuery', true);

  // If connceted, dont try connect again
  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  // Connect
  try {
    await mongoose.connect(MONGO_URI);
    isConnected = true;
    console.log('MongoDB connected..');
  } catch (error) {
    console.log(error);
  }
};
