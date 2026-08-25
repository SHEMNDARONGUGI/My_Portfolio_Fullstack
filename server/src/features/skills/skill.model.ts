import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  skill: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
});

export const Skill = mongoose.model("Skill", skillSchema);
