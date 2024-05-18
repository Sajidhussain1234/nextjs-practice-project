import mongoose from "mongoose";

async function connectToDB() {
  try {
    // Ensure MONGO_URI environment variable is set
    if (!process.env.MONGO_URI!) {
      throw new Error(
        "Missing MONGO_URI environment variable. Please set it before connecting to MongoDB."
      );
    }

    await mongoose.connect(process.env.MONGO_URI!);

    console.log("Connected to MongoDB successfully.");
  } catch (error: any) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Indicate an error exit for potential monitoring
  }
}

export default connectToDB;
