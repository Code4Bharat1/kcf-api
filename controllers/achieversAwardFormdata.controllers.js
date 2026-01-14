import AchieversAward from "../models/achieversAward.model.js";

const achieversAward = async (req, res) => {
  try {
    console.log("Reached achievers award controller");
    console.log("Body:", req.body);
    console.log("Files:", req.files);


    const data = await AchieversAward.findOne({ email: req.body.email });
    if (data) {
      return res.status(409).json({
        success: false,
        message: "An application with this email already exists.",
      });
    }

    // 1️⃣ Extract Aadhaar image paths
    const aadhaarImages =
      req.files?.map((file) => `/uploads/${file.filename}`) || [];

    // 2️⃣ Create DB document (MATCHING SCHEMA)
    const achieverData = await AchieversAward.create({
      // Personal Info
      surname: req.body.surname,
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      contactNumber: req.body.contactNumber,
      email: req.body.email,

      // Address
      currentAddress: req.body.currentAddress,
      nativeAddress: req.body.nativeAddress,

      // Aadhaar
      aadhaar: req.body.aadhaarNumber, // frontend sends aadhaarNumber

      aadhaarImages,

      // Education (NESTED)
      education: {
        ssc: {
          score: req.body.sscScore,
          year: Number(req.body.sscYear),
        },
        hsc: {
          score: req.body.hscScore,
          year: Number(req.body.hscYear),
        },
        graduation: {
          degree: req.body.graduation || "",
          year: req.body.graduationYear
            ? Number(req.body.graduationYear)
            : null,
        },
        postGraduation: {
          degree: req.body.postGraduation || "",
          year: req.body.postGraduationYear
            ? Number(req.body.postGraduationYear)
            : null,
        },
      },

      // Awards
      awardsReceived: req.body.awardsReceived,
    });

    // 3️⃣ Success response
    res.status(201).json({
      success: true,
      message: "Achievers Award form submitted successfully",
      data: achieverData,
    });

  } catch (error) {
    console.error("❌ Achievers Award submit error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while submitting Achievers Award form",
    });
  }
};

export default achieversAward;
