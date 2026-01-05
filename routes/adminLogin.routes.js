import express from "express";
import adminLogin from "../controllers/adminLogin.controllers.js"


const router = express.Router();





router.post("/admin/login", adminLogin);





export default router;