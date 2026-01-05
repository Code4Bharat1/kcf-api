import mongoose from "mongoose";

const achieversAwardSchema = new mongoose.Schema(
  {
    /* ---------- Personal Information ---------- */
    surname: {
      type: String,
      required: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    middleName: {
      type: String,
      trim: true,
    },

    contactNumber: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    /* ---------- Address ---------- */
    currentAddress: {
      type: String,
      required: true,
    },
    nativeAddress: {
      type: String,
      required: true,
    },

    /* ---------- Aadhaar (SECURE) ---------- */
    aadhaar: {
      type: String,
      required: true,
      // Example: XXXX-XXXX-1234
    },

    aadhaarImages: [
      {
        type: String, // URL of uploaded image
      },
    ],

    /* ---------- Education ---------- */
    education: {
      ssc: {
        score: { type: String, required: true },
        year: {
          type: Number,
          required: true,
        },
      },
      hsc: {
        score: { type: String, required: true },
        year: {
          type: Number,
          required: true,
        },
      },
      graduation: {
        degree: { type: String },
        year: { type: Number },
      },
      postGraduation: {
        degree: { type: String },
        year: { type: Number },
      },
    },

    /* ---------- Awards ---------- */
    awardsReceived: {
      type: String,
    },

    /* ---------- Status (for admin workflow) ---------- */
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const AchieversAward = mongoose.model("AchieversAward", achieversAwardSchema);

export default AchieversAward;
