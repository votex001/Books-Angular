import bcryptjs from "bcryptjs";
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
  confirmEmail,
  emailStatus,
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

    const userExist = await userService.getByVerifiedEmail(email);
    if (userExist) {
      throw "Login already exists";
    }

    const hash = await bcryptjs.hash(String(password), saltRounds);

    const verificationCode = generateVerificationCode();
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email confirmation",
      text: `Welcome to our website. Your confirmation code: ${verificationCode}. Please confirm your email here ${process.env.url}/confirm/${email}.`,
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
  try {
    const unverifiedUser = await userService.getUnverifiedUserByEmail(email);
    console.log(unverifiedUser)
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
  } catch (err) {
    throw err;
  }
}

async function emailStatus(email) {
  try {
    const user = await userService.getByEmail(email);
    return user;
  } catch (err) {
    throw err;
  }
}

async function resendCode(email) {
  try {
    const unverifiedUser = await userService.getUnverifiedUserByEmail(email);
    if (!unverifiedUser) throw "User not found or already verified";

    const newCode = generateVerificationCode();
    unverifiedUser.verificationCode = newCode;
    await userService.updateUnverifiedUser(unverifiedUser);

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email confirmation",
      text: `Welcome to our website. Your confirmation code: ${newCode}. Please confirm your email here ${process.env.url}/confirm/${email}.`,
    });

    return { message: "A new confirmation code has been sent to your email." };
  } catch (err) {
    throw err;
  }
}

async function login(email, password) {
  try {
    const user = await userService.getByVerifiedEmail(email);
    if (!user) throw "Invalid email";

    if (!user.isVerified) throw "Email not verified";

    const match = await bcryptjs.compare(String(password), user.password);
    if (!match) throw "Invalid password or login";

    delete user.password;
    user.id = user._id;
    delete user._id;

    return user;
  } catch (err) {
    throw err;
  }
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
  try {
    const user = await userService.getByVerifiedEmail(email);
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
   ${process.env.url}/resetPassword/${token}`,
    });
    return true;
  } catch (err) {
    throw err;
  }
}

// Reset pass
async function resetPassword(token, newPassword) {
  try {
    const user = await userService.getByResetToken(token);
    if (!user) {
      throw "Invalid or expired token";
    }

    const hashedPassword = await bcryptjs.hash(String(newPassword), saltRounds);
    await userService.updatePassword(user.email, hashedPassword);

    // delete token
    await userService.clearPasswordResetToken(user.email);
  } catch (err) {
    throw err;
  }
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
