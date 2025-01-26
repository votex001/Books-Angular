import bcrypt from "bcrypt";
import Cryptr from "cryptr";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { userService } from "../user/user.service.js";
import { getCollection } from "../../data/mongo.js";

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
  verifyEmail: confirmEmail,
  resendCode,
  requestPasswordReset,
  resetPassword,
  verifyResetToken,
};

// Verification code generation function
function generateVerificationCode() {
  return crypto.randomInt(100000, 999999).toString();
}

async function signup({ email, password, fullName }) {
  try {
    console.log(
      `auth.service - signup with fullName: ${fullName}, login: ${email}`
    );

    if (!email || !password || !fullName) {
      throw "Missing required signup information";
    }

    const userExist = await userService.getByEmail(email);
    if (userExist) {
      throw "Login already exists";
    }

    const hash = await bcrypt.hash(String(password), saltRounds);

    const verificationCode = generateVerificationCode();
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email confirmation",
      text: `Your confirmation code: ${verificationCode}`,
    });

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

async function confirmEmail(email, code) {
  const unverifiedUser = await userService.getUnverifiedUserByEmail(email);
  if (!unverifiedUser) throw "User not found or already verified";
  if (unverifiedUser.verificationCode === code) {
    const user = await userService.save({
      fullName: unverifiedUser.fullName,
      email: unverifiedUser.email,
      password: unverifiedUser.password,
      isVerified: true,
    });
    await userService.deleteUnverifiedUser(email);
    user.id = user._id;
    delete user._id;
    delete user.password;
    return user;
  } else {
    throw "Invalid verification code";
  }
}

async function resendCode(email) {
  const unverifiedUser = await userService.getUnverifiedUserByEmail(email);
  if (!unverifiedUser) throw "User not found or already verified";

  const newCode = generateVerificationCode();
  unverifiedUser.verificationCode = newCode;
  await userService.updateUnverifiedUser(unverifiedUser);

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Email confirmation",
    text: `Your confirmation code: ${newCode}`,
  });

  return { message: "A new confirmation code has been sent to your email." };
}

async function login(email, password) {
  const user = await userService.getByEmail(email);
  if (!user) throw "Invalid email";

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

async function requestPasswordReset(email) {
  const user = await userService.getByEmail(email);
  if (!user) {
    return false;
  }

  const token = crypto.randomBytes(20).toString("hex");

  // save token
  await userService.savePasswordResetToken(user.email, token);

  // send email
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset",
    text: `You are receiving this email because you requested a password reset. Please click the following link, or paste it into your browser to complete the process: 
   http://localhost:5173/resetPassword/${token}`,
  });
  return true;
}

// Reset pass
async function resetPassword(token, newPassword) {
  const user = await userService.getByResetToken(token);
  if (!user) {
    throw "Invalid or expired token";
  }

  const hashedPassword = await bcrypt.hash(String(newPassword), saltRounds);
  await userService.updatePassword(user.email, hashedPassword);

  // delete token
  await userService.clearPasswordResetToken(user.email);
}

async function verifyResetToken(token) {
  try {
    const collection = await getCollection("users");
    const user = await collection.findOne({
      resetPasswordToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return null;
    } else {
      return { email: user.email };
    }
  } catch (err) {
    throw err;
  }
}
