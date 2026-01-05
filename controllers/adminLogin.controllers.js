import jwt from "jsonwebtoken";

const adminLogin = (req, res) => {
  const { email, password } = req.body;

  // hard-coded credentials
  if (email === "admin@kcf.com" && password === "admin123") {

    // create token
    const token = jwt.sign(
      { userId: "admin@kcf.com", role: "admin" },
      process.env.JWT_SECRET || "kcf_secret",
      { expiresIn: "1d" }
    );

    // assign token to browser (cookie)
    res.cookie("adminToken", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
    });
  }

  // if not matched
  return res.status(401).json({
    success: false,
    message: "Invalid email or password",
  });
};

export default adminLogin;

