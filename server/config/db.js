import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongodb connected ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.log(`Error : ${error.message}`);
  }
};

export default connectDB;
