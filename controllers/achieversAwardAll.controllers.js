import achieversAwardModel from "../models/achieversAward.model.js";

const achieversAward = async (req, res) => {
  try {
    // console.log("📩 Achievers Award fetch reached");

    // 1️⃣ Fetch all records (latest first)
    const achievers = await achieversAwardModel
      .find()
      .sort({ createdAt: -1 });

    // 2️⃣ Send to frontend
    return res.status(200).json({
      success: true,
      count: achievers.length,
      data: achievers,
    });

  } catch (error) {
    console.error("❌ Error fetching achievers award data:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch achievers award data",
    });
  }
};

export default achieversAward;
