import mongoose from "mongoose";

let connectionPromise: Promise<typeof mongoose> | undefined;

export const connectDB = async (): Promise<void> => {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (!connectionPromise || mongoose.connection.readyState === 0) {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error("MONGO_URI is required to connect to MongoDB");
    }

    connectionPromise = mongoose.connect(uri).catch((error: unknown) => {
      connectionPromise = undefined;
      throw error;
    });
  }

  await connectionPromise;
};
