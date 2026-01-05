import express from "express";
import upload from "../middlewares/upload.js";
import aiScholarship from "../controllers/aiScholarshipFormData.controllers.js";

const router = express.Router();

router.post("/ai-scholarship/formData", aiScholarship);

export default router;
