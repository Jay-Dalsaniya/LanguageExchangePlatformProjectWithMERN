import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    platform: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    fees: {
      type: String,
      required: true,
    },
    feeType: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    aboutCourse: {
      type: String,
      required: true,
    },
    language: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Language",
      required: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);
