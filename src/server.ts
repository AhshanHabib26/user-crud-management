import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";
dotenv.config();

async function main() {
  try {
    await mongoose.connect(process.env.DB_URL as string);
    app.listen(process.env.PORT, () => {
      console.log(`CRUD Application listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
