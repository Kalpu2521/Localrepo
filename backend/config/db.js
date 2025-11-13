import mongoose from "mongoose";

const connectToDatabase = async () => {
  const mongoUri = process.env.MONGO_URI || "mongodb+srv://kalpana:Geetasingh@cluster0.hcxrv9a.mongodb.net/?appName=Cluster0";
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(mongoUri, {
      dbName: process.env.MONGO_DB || undefined,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    throw error;
  }
};

export default connectToDatabase;

