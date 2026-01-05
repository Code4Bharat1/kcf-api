import mongoose from "mongoose";

const aiScholarshipSchema = new mongoose.Schema(
  {
    /* ---------- Personal Information ---------- */
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    dob: {
      type: Date,
      required: true,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },

    mobile: {
      type: String,
      required: true,
      match: /^[0-9+]{10,14}$/, // supports +91
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
    },

    kokanRegion: {
      type: String,
      enum: ["yes", "no"],
      required: true,
    },

    /* ---------- Educational Details ---------- */
    schoolName: {
      type: String,
      required: true,
    },

    board: {
      type: String,
      enum: ["state", "cbse", "icse", "other"],
      required: true,
    },

    currentStatus: {
      type: String,
      enum: ["passed11", "appearing12"],
      required: true,
    },

    stream: {
      type: String,
      enum: ["pcm", "pcb"],
      required: true,
    },

    percentage11: {
      type: String,
      required: true,
    },

    /* ---------- Career Interest ---------- */
    careerPath: {
      type: String,
      enum: ["ai", "cybersecurity", "datascience"],
      required: true,
    },

    motivation: {
      type: String,
      required: true,
      minlength: 100,
      maxlength: 1500,
    },

    /* ---------- Background Activities ---------- */
    onlineCourses: {
      type: Boolean,
      default: false,
    },

    codingPractice: {
      type: Boolean,
      default: false,
    },

    workshops: {
      type: Boolean,
      default: false,
    },

    noneButInterested: {
      type: Boolean,
      default: false,
    },

    /* ---------- Family Background ---------- */
    familyIncome: {
      type: String,
      enum: ["below2", "2-5", "5-10", "above10"],
      required: true,
    },

    firstGraduate: {
      type: String,
      enum: ["yes", "no"],
      required: true,
    },

    /* ---------- Counselling ---------- */
    counsellingTime: {
      type: String,
      enum: ["morning", "afternoon", "evening"],
      required: true,
    },

    counsellingLanguage: {
      type: String,
      enum: ["english", "hindi", "marathi"],
      required: true,
    },

    /* ---------- Declarations ---------- */
    declaration1: {
      type: Boolean,
      required: true,
    },
    declaration2: {
      type: Boolean,
      required: true,
    },
    declaration3: {
      type: Boolean,
      required: true,
    },
    declaration4: {
      type: Boolean,
      required: true,
    },

    /* ---------- Admin Workflow ---------- */
    status: {
      type: String,
      enum: ["pending", "shortlisted", "selected", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const AiScholarship = mongoose.model(
  "AiScholarship",
  aiScholarshipSchema
);

export default AiScholarship;
