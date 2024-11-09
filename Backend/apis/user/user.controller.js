import { loggerService } from "../../services/logger.service.js";
import { authService } from "../auth/auth.service.js";

export async function verifyToken(req, res) {
  try {
    const user = authService.validateToken(req.cookies.loginToken);
    const existUser = user ? await userService.getById(user.id) : null;

    if (!existUser) {
      if (user || req.cookies?.loginToken) {
        res.clearCookie("loginToken");
      }
      res.send();
    } else {
      existUser.id = existUser._id;
      delete existUser._id;
      return res.status(200).send(existUser);
    }
  } catch (err) {
    loggerService.info("verifyToken", err);
    res.status(401).send({ err: "Failed to check" });
  }
}
