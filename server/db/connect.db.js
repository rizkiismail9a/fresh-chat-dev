const mongoose = require("mongoose");

async function connectToDB() {
  try {
    const connection = await mongoose.connect(process.env.DB_URI);
    console.log(`MongoDB connected ${connection.connection.host}`);
    console.log("DB Terhubung");
  } catch (error) {
    console.error("error DB", error);
  }
}

module.exports = connectToDB;
