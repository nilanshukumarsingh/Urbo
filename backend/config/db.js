import mongoose from "mongoose";

let isConnected = false;

// Connect to MongoDB
const connectDB = async () => {
  if (isConnected) return;

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not configured");
  }

  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    isConnected = connection.connections?.[0]?.readyState === 1;
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    throw error;
  }
};

export default connectDB;
