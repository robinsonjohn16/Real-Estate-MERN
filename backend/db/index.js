import mongoose from "mongoose";

const connectDB = async () => {
   try {
      const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
      if (!connectionInstance) {
         process.exit(1);
      }
      console.log(`MongoDB connected: ${connectionInstance.connection.host}`);
   } catch (error) {
      console.log(error);
      process.exit(1);
   }
};

export default connectDB;
