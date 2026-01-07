import AiScholarship from "../models/aiScholarship.model.js";

const aiScholarshipController = async (req, res) => {
  try {
    console.log("📩 AI Scholarship form reached");
    console.log("📄 Raw Request Body:", req.body);

    const body = req.body;

    /* ======================================================
       ✅ FRONTEND → BACKEND FIELD MAPPING (CRITICAL FIX)
       This makes frontend + postman BOTH work
    ====================================================== */
    const payload = {
      ...body,

      /* ---- LEGACY REQUIRED FIELDS (schema expects these) ---- */
      schoolName: body.tenthSchoolName,
      board: body.tenthBoard,
      percentage11: body.eleventhPercentage,
      stream: body.eleventhStream,
      currentStatus: "passed11", // fixed value based on your form
      familyIncome: body.fatherIncome,

      /* ---- SAFETY NORMALIZATION ---- */
      counsellingMobile: body.counsellingMobile || body.mobile,
      fullName: body.fullName?.trim(),
      email: body.email?.trim(),
      motivation: body.motivation?.trim(),
    };

    console.log("✅ Final Payload to Save:", payload);

    const application = await AiScholarship.create(payload);

    return res.status(201).json({
      success: true,
      message: "AI Scholarship application submitted successfully",
      data: application,
    });
  } catch (error) {
    console.error("❌ Scholarship submit error:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Duplicate entry detected",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default aiScholarshipController;
