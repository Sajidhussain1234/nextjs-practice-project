import mongoose from "mongoose";

export function connectToDB() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("connected to mongoDB successfully");
    });
    connection.on("error", (error) => {
      console.log("error connecting to mongoDB", error);
    });
    process.exit();
  } catch (error) {
    console.error("some thing went wrong");
    console.log(error);
  }
}
