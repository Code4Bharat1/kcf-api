import AiScholarshipModel from "../models/aiScholarship.model.js";

const aiScholarshipAll = async (req, res) => {
  try {
   //  console.log("aiScholarship reached!");

    // Get all AI Scholarship applications sorted by newest first
    const scholarships = await AiScholarshipModel.find()
      .sort({ createdAt: -1 }) // Sort by date, newest first
      .lean(); // Convert to plain JavaScript objects for better performance

    // Send response
    res.status(200).json({
      success: true,
      count: scholarships.length,
      data: scholarships,
      message: "AI Scholarship applications retrieved successfully"
    });

  } catch (error) {
    console.error("Error fetching AI Scholarship data:", error);
    
    res.status(500).json({
      success: false,
      message: "Failed to fetch AI Scholarship applications",
      error: error.message
    });
  }
};

export default aiScholarshipAll;
