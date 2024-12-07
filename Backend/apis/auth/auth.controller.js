import { loggerService } from "../../services/logger.service.js";
import { userService } from "../user/user.service.js";
import { authService } from "./auth.service.js";

export async function signup(req, res) {
  try {
    const credentials = req.body;

    const user = await userService.getUnverifiedUserByEmail(credentials.email);
    if (user) {
      return res.status(201).json({
        message: "The confirmation code has been sent already",
        status: 201,
      });
    } else {
      await authService.signup(credentials);
      res.status(201).json({
        message: "The confirmation code has been sent to your email.",
        status: 201,
      });
    }
  } catch (e) {
    console.error("Failed to signup " + e);
    if (e === "login already exist") {
      return res.status(409).send({ err: "This username already exists" });
    }
    res.status(400).send({ err: "Failed to signup" });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).send({ err: "Failed to login" });
  }

  try {
    const user = await authService.login(email, password);

    if (!user.isVerified) {
      return res.status(403).send({
        err: "Email is not confirmed. Check your mail and confirm your email.",
      });
    }

    const loginToken = authService.getLoginToken(user);

    res.cookie("loginToken", loginToken, {
      sameSite: "None",
      secure: true,
      maxAge: 86400000,
    });
    res.json(user);
  } catch (err) {
    console.error("Failed to Login " + err);
    res.status(401).send({ err: "Failed to Login" });
  }
}

export async function verifyEmail(req, res) {
  try {
    const { email, code } = req.body;
    const user = await authService.verifyEmail(email, code);
    if (user) {
      const loginToken = authService.getLoginToken(user);

      res.cookie("loginToken", loginToken, {
        sameSite: "None",
        secure: true,
        maxAge: 86400000,
      });
      res.status(200).json(user);
    } else {
      res.status(400).json({ err: "Invalid confirmation code." });
    }
  } catch (error) {
    console.error("Failed to verify email: " + error);
    res.status(400).json({ err: "Failed to verify email." });
  }
}

export async function resendCode(req, res) {
  try {
    const { email } = req.body;
    await authService.resendCode(email);
    res.status(200).json({
      message: "A new confirmation code has been sent to your email.",
    });
  } catch (error) {
    console.error("Failed to resend code: " + error);
    res.status(400).json({ err: "Failed to resend code." });
  }
}

export async function requestPasswordReset(req, res) {
  const { email } = req.body;
  try {
    const booleanAns = await authService.requestPasswordReset(email);
    if (booleanAns) {
      res
        .status(200)
        .json({ message: "Password reset link sent to your email.", ok: true });
    } else {
      res.status(200).json({ message: "User not found", ok: false });
    }
  } catch (e) {
    console.error("Failed to send reset link: ", e);
    res.status(400).send({ err: "Failed to send reset link" });
  }
}

export async function resetPassword(req, res) {
  const { token, newPassword } = req.body;

  try {
    await authService.resetPassword(token, newPassword);
    res
      .status(200)
      .json({
        success: true,
        message: "Password has been successfully reset.",
      });
  } catch (e) {
    console.error("Failed to reset password: ", e);
    res.status(400).send({ err: "Failed to reset password" });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("loginToken", {
      path: "/",
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      httpOnly: true,
      sameSite: "Strict",
    });
    res.send({ msg: "Logged out successfully" });
  } catch (err) {
    res.status(400).send({ err: "Failed to logout" });
  }
}

export async function verifyResetToken(req, res) {
  const { token } = req.body;
  try {
    const user = await authService.verifyResetToken(token);
    if (user) {
      res.send({ success: true, email: user.email });
    } else {
      res.send({ success: false, message: "Invalid or expired token." });
    }
  } catch (err) {
    loggerService.info(err);
  }
}
