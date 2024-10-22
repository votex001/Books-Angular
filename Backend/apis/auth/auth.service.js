import bcrypt from "bcrypt";
import Cryptr from "cryptr";

import { userService } from "../user/user.service.js";
const cryptr = new Cryptr(process.env.CRYPTR_PASS);

export const authService = { signup, login, getLoginToken, validateToken };

async function signup({ login, password, fullName }) {
  const saltRounds = 10;
  try {
    console.log(
      `auth.service - signup with username: ${fullName}, login: ${login}`
    );

    if (!login || !password || !fullName) {
      throw "Missing required signup information";
    }

    const userExist = await userService.getByLogin(login);
    if (userExist) {
      throw "login already exist";
    }
    const hash = await bcrypt.hash(password, saltRounds);

    return userService.save({
      fullName,
      password: hash,
      login,
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function login(login, password) {
  const user = await userService.getByLogin(login);
  if (!user) throw "Invalid login";
  const match = bcrypt.compare(password, user.password);
  if (!match) throw "Invalid password or login";

  delete user.password;
  user.id = user._id;
  delete user._id;

  return user;
}

function getLoginToken(user) {
  const str = JSON.stringify(user);
  const encryptedStr = cryptr.encrypt(str);
  return encryptedStr;
}
function validateToken(token) {
  try {
    const json = cryptr.decrypt(token);
    const loggedinUser = JSON.parse(json);
    return loggedinUser;
  } catch (err) {
    return null;
  }
}
