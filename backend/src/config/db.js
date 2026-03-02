import mongoose from "mongoose";

// Kết nối đến MongoDB
export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        process.exit(1); //exit with error
    }
};