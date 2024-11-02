import bcrypt from "bcrypt";
import Cryptr from "cryptr";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { userService } from "../user/user.service.js";

const cryptr = new Cryptr(process.env.CRYPTR_PASS);
const saltRounds = 10;

// Setting up for sending email
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const authService = {
  signup,
  login,
  getLoginToken,
  validateToken,
  verifyEmail,
  resendCode,
};

// Verification code generation function
function generateVerificationCode() {
  return crypto.randomInt(100000, 999999).toString(); // 6-значный код
}

// Регистрация нового пользователя с отправкой кода на email
async function signup({ email, password, fullName }) {
  try {
    console.log(
      `auth.service - signup with fullName: ${fullName}, login: ${email}`
    );

    if (!email || !password || !fullName) {
      throw "Missing required signup information";
    }

    const userExist = await userService.getByLogin(email);
    if (userExist) {
      throw "Login already exists";
    }

    const hash = await bcrypt.hash(String(password), saltRounds);

    // Генерация и отправка кода подтверждения
    const verificationCode = generateVerificationCode();
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email, // предполагаем, что login — это email
      subject: "Email confirmation",
      text: `Your confirmation code: ${verificationCode}`,
    });

    // Сохранение неподтвержденного пользователя с кодом
    return userService.saveUnverifiedUser({
      fullName,
      password: hash,
      email: email,
      isVerified: false,
      verificationCode,
      createdAt: new Date(),
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
}

// Подтверждение email с кодом
async function verifyEmail(email, code) {
  const unverifiedUser = await userService.getUnverifiedUserByLogin(email);
  if (!unverifiedUser) throw "User not found or already verified";
  if (unverifiedUser.verificationCode === code) {
    // Перенос пользователя в основную коллекцию, удаление из неподтвержденных
    const user = await userService.save({
      fullName: unverifiedUser.fullName,
      email: unverifiedUser.email,
      password: unverifiedUser.password,
      isVerified: true,
    });
    await userService.deleteUnverifiedUser(email);
    return user;
  } else {
    throw "Invalid verification code";
  }
}

// Повторная отправка кода подтверждения
async function resendCode(login) {
  const unverifiedUser = await userService.getUnverifiedUserByLogin(login);
  if (!unverifiedUser) throw "User not found or already verified";

  const newCode = generateVerificationCode();
  unverifiedUser.verificationCode = newCode;
  await userService.updateUnverifiedUser(unverifiedUser);

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: login,
    subject: "Email confirmation",
    text: `Your confirmation code: ${newCode}`,
  });

  return { message: "A new confirmation code has been sent to your email." };
}

// Вход пользователя с проверкой статуса верификации
async function login(login, password) {
  const user = await userService.getByLogin(login);
  if (!user) throw "Invalid login";

  if (!user.isVerified) throw "Email not verified";

  const match = await bcrypt.compare(String(password), user.password);
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
