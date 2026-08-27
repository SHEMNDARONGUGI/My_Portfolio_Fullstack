import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: false,
    trim: true,
  },

  certTitle: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
    trim: true,
  },

  certLink: {
    type: String,
    required: false,
    trim: true,
  },
});

export const Certificate = mongoose.model("Certificate", certificateSchema);
