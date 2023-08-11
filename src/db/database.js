import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectionString = process.env.MONGO_URL;

try {
  console.log(process.env.MONGO_URL);
  await mongoose.connect(connectionString);

  console.log("CONECTADO A MONGO OK");
} catch (error) {
  console.log(error);
}
