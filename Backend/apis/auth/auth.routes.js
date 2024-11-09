import express from "express";
import { login, signup, verifyEmail, resendCode, requestPasswordReset, resetPassword, logout } from "./auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify-email", verifyEmail);  
router.post("/resend-code", resendCode);    
router.post("/request-password-reset", requestPasswordReset); 
router.post("/reset-password", resetPassword); 

export const authRoutes = router;
