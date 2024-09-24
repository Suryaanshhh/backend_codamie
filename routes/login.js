import express from "express";
const router = express.Router();
import Login from "../controller/login_controller.js"


router.post("/login",Login);

export default router;