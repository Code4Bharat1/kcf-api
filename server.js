import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import cors from "cors"
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
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

/* ---------- Routes ----------- */
app.get("/test", (req, res) => {
  console.log("Backend Connected ✅");
  res.status(200).json({
    success: true,
    message: "Backend Connected Successfully",
  });
});

app.use("/api", achieversAward);
app.use("/api", achieversAwardAll);


app.use("/api", aiScholarship);
app.use("/api", aiScholarshipAll);


app.use("/api", contactForm);


app.use("/api", adminLogin);
app.use("/api", adminAuth);

/* ---------- Server ---------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
