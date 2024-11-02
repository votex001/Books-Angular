import express from "express";
import { login, signup, verifyEmail, resendCode } from "./auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/verify-email", verifyEmail);  // Маршрут для подтверждения email
router.post("/resend-code", resendCode);    // Маршрут для повторной отправки кода

export const authRoutes = router;
