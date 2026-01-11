import mongoose from "mongoose";
console.log("🔥 NEW AI SCHOLARSHIP SCHEMA LOADED 🔥");

const aiScholarshipSchema = new mongoose.Schema(
  {
    /* ---------- Personal Information ---------- */
    fullName: { type: String, required: true, trim: true },
    dob: { type: Date, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    mobile: { type: String, required: true },
    email: { type: String },
    address: { type: String, required: true },
    kokanRegion: { type: String, enum: ["yes", "no"], required: true },
    hafizEQuran: { type: String, enum: ["yes", "no"], required: true },

    /* ---------- 10th ---------- */
    tenthSchoolName: { type: String, required: true },
    tenthBoard: {
      type: String,
      enum: ["state", "cbse", "icse", "other"],
      required: true,
    },
    tenthPercentage: { type: String, required: true },

    /* ---------- 11th ---------- */
    eleventhCollegeName: { type: String, required: true },
    eleventhBoard: {
      type: String,
      enum: ["state", "cbse", "icse", "other"],
      required: true,
    },
    eleventhStream: { type: String, required: true },
    eleventhPercentage: { type: String, required: true },

    /* ---------- 12th ---------- */
    // twelfthCollegeName: { type: String, required: true },
    twelfthBoard: {
      type: String,
      enum: ["state", "cbse", "icse", "other"],
      required: true,
    },
    twelfthStream: { type: String, required: true },
    twelfthPercentage: { type: String, required: true },

    /* ---------- Career ---------- */
    careerPath: { type: String, required: true },
    motivation: { type: String, minlength: 100, required: true },

    /* ---------- Activities ---------- */
    onlineCourses: Boolean,
    codingPractice: Boolean,
    workshops: Boolean,
    noneButInterested: Boolean,

    /* ---------- Family ---------- */
    fatherName: { type: String, required: true },
    fatherOccupation: { type: String, required: true },
    fatherIncome: { type: String, required: true },

    motherName: { type: String, required: true },
    motherOccupation: { type: String, required: true },
    motherIncome: { type: String},

    // isOrphan: { type: String, enum: ["yes", "no"], required: true },
    firstGraduate: { type: String, enum: ["yes", "no"], required: true },

    /* ---------- Counselling ---------- */
    counsellingMobile:{ type: String, required: true },
    counsellingTime: { type: String, required: true },
    counsellingLanguage: { type: String, required: true },
    mobileOwner: { type: String, required: true },

    /* ---------- Declarations ---------- */
    declaration1: { type: Boolean, required: true },
    declaration2: { type: Boolean, required: true },
    declaration3: { type: Boolean, required: true },
    declaration4: { type: Boolean, required: true },

    /* ---------- Admin ---------- */
    status: {
      type: String,
      enum: ["pending", "shortlisted", "selected", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.AiScholarship ||
  mongoose.model("AiScholarship", aiScholarshipSchema);
