import mongoose from "mongoose";

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to MongoDB");
  } catch (error: any) {
    console.error("Error connecting to MongoDB:", error.message);
  }

  // try {
  //   mongoose.connect(process.env.MONGO_URI!);
  //   const connection = mongoose.connection;
  //   console.log("1", connection);
  //   connection.on("connected", () => {
  //     console.log("connected to mongoDB successfully");
  //   });
  //   connection.on("error", (error) => {
  //     console.log("error connecting to mongoDB", error);
  //   });
  //   process.exit();
  // } catch (error) {
  //   console.error("some thing went wrong");
  //   console.log(error);
  // }
}

export default connectToDB;
