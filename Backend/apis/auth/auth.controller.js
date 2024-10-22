import { userService } from "../user/user.service.js";
import { authService } from "./auth.service.js";

export async function signup(req, res) {
  try {
    const credentials = req.body;
    await authService.signup(credentials);
    const user = await authService.login(
      credentials.login,
      credentials.password
    );
    const loginToken = authService.getLoginToken(user);
    res.cookie("loginToken", loginToken, {
      sameSite: "None",
      secure: true,
      maxAge: 86400000,
    });
    res.json(user);
  } catch (e) {
    console.error("Failed to signup " + e);
    if (e === "login already exist") {
      return res.status(409).send({ err: "This username already exists" });
    }
    res.status(400).send({ err: "Failed to signup" });
  }
}

export async function login(req, res) {
  const { login, password } = req.body;

  if (!login || !password) res.status(401).send({ err: "Failed to login" });

  try {
    const user = await authService.login(login, password);
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
