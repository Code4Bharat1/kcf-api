import jwt from "jsonwebtoken";

const adminAuth = (req, res) => {
  try {
    console.log("Admin auth reached!");

    // 1️⃣ Get token from cookie
    const token = req.cookies?.adminToken;

    // 2️⃣ If no token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    // 3️⃣ Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "kcf_secret"
    );

    // 4️⃣ Optional role check
    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    // 5️⃣ Auth success
    return res.status(200).json({
      success: true,
      message: "Admin authenticated",
      user: {
        userId: decoded.userId,
        role: decoded.role,
      },
    });

  } catch (error) {
    console.error("Admin auth error:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default adminAuth;
