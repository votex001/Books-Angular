import { loggerService } from "../../services/logger.service.js";
import { authService } from "../auth/auth.service.js";
import { userService } from "./user.service.js";

export async function verifyToken(req, res) {
  try {
    const user = authService.validateToken(req.cookies.loginToken);
    const existUser = user ? await userService.getByEmail(user.email) : null;

    if (!existUser) {
      if (user || req.cookies?.loginToken) {
        res.clearCookie("loginToken");
      }
      res.send();
    } else {
      existUser.id = existUser._id;
      delete existUser._id;
      delete existUser.password;
      return res.status(200).send(existUser);
    }
  } catch (err) {
    loggerService.info("verifyToken", err);
    res.status(401).send({ err: "Failed to check" });
  }
}

export async function updateUser(req, res) {
  const loggedinUser = req.loggedinUser;
  const { id, fullName, email, imgUrl } = req.body;
  if (!id) {
    return res.status(400).send("Could't update user");
  }
  if (!loggedinUser || loggedinUser.id !== id) {
    loggerService.info(
      "updateUser",
      `user ${loggedinUser.id} tried to save not his user ${id}`
    );
    return res.status(400).send("Could't update user");
  }

  const userToSave = {
    id,
    ...(fullName && { fullName }),
    ...(email && { email }),
    ...(imgUrl && { imgUrl }),
  };

  try {
    const savedUser = await userService.save(userToSave);
    res.send(savedUser);
  } catch (err) {
    loggerService.info("updateUser", err);
    res.status(400).send("Could't update user");
  }
}
