import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
    {
        company: {
            type: String, required: true, trim: true
        },

        role: {
            type: String, required: true, trim: true
        },

        description: {
            type: String, required: true, trim: true
        },

        startDate: {
            type: String, required: true
        },

        endDate: {
            type: String
        },

        technologies: {
            type: [String], default[]
        },

        current: {
            type: Boolean, default: false
        }
    },
    {
        timestamps: true
    }
);

export const Experience = mongoose.model("Experience", experienceSchema)