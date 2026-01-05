import AiScholarship from "../models/aiScholarship.model.js";

const aiScholarshipController = async (req, res) => {
  try {
    console.log("📩 AI Scholarship form reached");
    console.log("📄 Request Body:", req.body);

    // Save data directly (schema already validates everything)
    const application = await AiScholarship.create(req.body);

    return res.status(201).json({
      success: true,
      message: "AI Scholarship application submitted successfully",
      data: application,
    });
  } catch (error) {
    console.error("❌ Scholarship submit error:", error);

    // Mongoose validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }

    // Duplicate key (if you later add unique fields)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Duplicate entry detected",
      });
    }

    // Generic server error
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default aiScholarshipController;
