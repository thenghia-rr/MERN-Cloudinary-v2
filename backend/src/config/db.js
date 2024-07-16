import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database is connected !");
  } catch (error) {
    console.log("Connect database is Failure !", error);
    process.exit(1);
  }
};

export default connectDB;
