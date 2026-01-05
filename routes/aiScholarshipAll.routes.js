import express from "express";
import aiScholarshipAll from "../controllers/aiScholarshipAll.controllers.js";



const router = express.Router();




router.get("/ai-scholarship/all", aiScholarshipAll);






export default router;