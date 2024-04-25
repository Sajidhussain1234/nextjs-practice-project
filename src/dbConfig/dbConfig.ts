import mongoose from "mongoose";

export function connectToDB() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("connected to mongoDB successfully");
    });
    connection.on("error", (err) => {
      console.log("error connecting to mongoDB", err);
    });
    process.exit();
  } catch (error) {
    console.error("some thing went wrong");
    console.log(error);
  }
}
