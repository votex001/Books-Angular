import { authService } from "./auth.service.js";

export async function signup(req, res) {
  try {
    const credentials = req.body;

    await authService.signup(credentials);
    res.status(201).json({
      message: "The confirmation code has been sent to your email."
    });
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
        err: "Email is not confirmed. Check your mail and confirm your email."
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
    const result = await authService.verifyEmail(email, code);
    if (result) {
      res.status(200).json({ message: "Email successfully confirmed." });
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
    res.status(200).json({ message: "A new confirmation code has been sent to your email." });
  } catch (error) {
    console.error("Failed to resend code: " + error);
    res.status(400).json({ err: "Failed to resend code." });
  }
}
