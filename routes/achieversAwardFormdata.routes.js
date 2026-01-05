import express from "express";
import achieversAward from "../controllers/achieversAwardFormdata.controllers.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

// Expect max 2 Aadhaar images
router.post(
  "/achievers-award/formData",
  upload.array("aadhaarImages", 2),
  achieversAward
);


export default router;
