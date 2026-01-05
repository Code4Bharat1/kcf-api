import express from "express";
import adminAuth from "../controllers/adminAuth.controllers.js"


const router = express.Router();



router.get("/admin/auth/check", adminAuth);





export default router;