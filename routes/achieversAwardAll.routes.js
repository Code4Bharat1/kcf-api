import express from "express";
import getAchieversAward from "../controllers/achieversAwardAll.controllers.js"



const router = express.Router();




router.get("/achievers-award/all", getAchieversAward);





export default router;