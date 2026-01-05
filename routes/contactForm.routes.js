import express from "express";
import contactForm from "../controllers/contactForm.controllers.js";




const router = express.Router();




router.post("/contact-form", contactForm);





export default router;