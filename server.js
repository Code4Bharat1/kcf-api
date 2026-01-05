import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import cors from "cors"
import rateLimit from "express-rate-limit";
import achieversAward from "./routes/achieversAwardFormdata.routes.js";
import aiScholarship from "./routes/aiScholarshipFormData.routes.js";
import contactForm from "./routes/contactForm.routes.js";
import achieversAwardAll from "./routes/achieversAwardAll.routes.js";
import aiScholarshipAll from "./routes/aiScholarshipAll.routes.js";
import adminLogin from "./routes/adminLogin.routes.js";
import cookieParser from "cookie-parser";
import adminAuth from "./routes/adminAuth.routes.js";

dotenv.config();

const app = express();
app.use(cookieParser());
connectDB();

/* ---------- Middlewares ---------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(
  cors({
    origin: ["http://localhost:3000","https://kokancommunityforum.org"],
    credentials: true,
  })
);

/* ---------- Rate Limiters ---------- */

// Global rate limiter - applies to all requests
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: "Too many requests from this IP, please try again after 15 minutes"
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: "Too many requests from this IP, please try again after 15 minutes"
    });
  }
});

// Stricter rate limiter for form submissions
const formSubmitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 form submissions per hour
  message: {
    success: false,
    message: "Too many form submissions from this IP, please try again after an hour"
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: "Too many form submissions from this IP, please try again after an hour"
    });
  }
});

// Login rate limiter - stricter to prevent brute force attacks
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login attempts per windowMs
  message: {
    success: false,
    message: "Too many login attempts from this IP, please try again after 15 minutes"
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Don't count successful requests
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: "Too many login attempts from this IP, please try again after 15 minutes"
    });
  }
});

// API data fetching rate limiter (for admin routes)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Higher limit for API calls
  message: {
    success: false,
    message: "Too many API requests, please try again later"
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: "Too many API requests, please try again later"
    });
  }
});

// Apply global rate limiter to all requests
app.use(globalLimiter);

/* ---------- Routes ----------- */
app.get("/test", (req, res) => {
  console.log("Backend Connected ✅");
  res.status(200).json({
    success: true,
    message: "Backend Connected Successfully",
  });
});

// Form submission routes with stricter rate limiting
app.use("/api/achievers-award/formData", formSubmitLimiter);
app.use("/api/ai-scholarship/formData", formSubmitLimiter);
app.use("/api/contact-form", formSubmitLimiter);

// Login route with login-specific rate limiting
app.use("/api/admin/login", loginLimiter);

// Apply routes
app.use("/api", achieversAward);
app.use("/api", achieversAwardAll);

app.use("/api", aiScholarship);
app.use("/api", aiScholarshipAll);

app.use("/api", contactForm);

app.use("/api", adminLogin);
app.use("/api", adminAuth);

// Admin data fetching routes with API rate limiter
app.use("/api/achievers-award/all", apiLimiter);
app.use("/api/ai-scholarship/all", apiLimiter);

/* ---------- Error Handling ---------- */
// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error"
  });
});

/* ---------- Server ---------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
