import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);

    console.log("DB Terhubung");
  } catch (error) {
    console.error(error);
  }
};

export default connectToDB;
