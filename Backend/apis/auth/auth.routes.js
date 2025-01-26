import express from "express";
import {
  login,
  signup,
  confirmEmail,
  resendCode,
  requestPasswordReset,
  resetPassword,
  logout,
  verifyResetToken,
  emailStatus,
} from "./auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/confirm-email", confirmEmail);
router.post("/email-status", emailStatus);
router.post("/resend-code", resendCode);
router.post("/request-password-reset", requestPasswordReset);
router.post("/verify-reset-token", verifyResetToken);
router.post("/reset-password", resetPassword);

export const authRoutes = router;
