import mongoose, { mongo } from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: { type: String, required: true, trim: true },
    technologies: { type: [String], default: [] },
    githubUrl: {
      type: String,
      trim: true,
    },
    liveUrl: { type: String, trim: true },
    imageUrl: { type: String, trim: true },
    featured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const Project = mongoose.model("Project", projectSchema);
