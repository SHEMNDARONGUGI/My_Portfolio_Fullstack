import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    institution: {
      type: String,
      required: true,
      trim: true,
    },

    course: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    skills: {
      type: [String],
      default: [],
    },

    startDate: {
      type: String,
      required: true,
    },

    endDate: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Education = mongoose.model("Education", educationSchema);
