import mongoose from "mongoose";

const AiScholarship =
  mongoose.models.AiScholarship;

const aiScholarshipAll = async (req, res) => {
  try {
    const scholarships = await AiScholarship.find()
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: scholarships.length,
      data: scholarships,
      message: "AI Scholarship applications retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching AI Scholarship data:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch AI Scholarship applications",
      error: error.message,
    });
  }
};

export default aiScholarshipAll;
