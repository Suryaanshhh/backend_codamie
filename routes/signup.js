import express from "express";
 const router = express.Router();

 import SignUp from "../controller/signup_controller.js";  
 router.post("/register",SignUp);

 export default router;