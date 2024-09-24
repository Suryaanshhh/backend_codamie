import express from "express";
const router = express.Router();

import SignUp from "../controller/signup_controller.js";
import Verification from "../controller/email_verification.js"


router.post("/register", SignUp);
router.post("/verification",Verification);

export default router;
