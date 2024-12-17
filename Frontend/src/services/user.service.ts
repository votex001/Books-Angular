import { User } from "../assets/models/user.model";
import { httpService } from "./http.service";

export const userService = {
  signUp,
  login,
  confirmEmail,
  verifyToken,
  logout,
  verifyResetToken,
  resetPassword,
  sendResetTokenToMail,
  updateUser,
};

async function signUp(credentials: object) {
  const data = httpService.post<any>("auth/signup", credentials);
  return data;
}

async function login(credentials: {
  email: string;
  password: string;
}): Promise<User> {
  try {
    return await httpService.post<User>("auth/login", credentials);
  } catch (err) {
    throw err;
  }
}

async function confirmEmail(email: string, code: string) {
  const data = await httpService.post<User>("auth/verify-email", {
    email,
    code,
  });
  console.log(data);
  return data;
}

async function verifyToken() {
  const user = await httpService.post<any>("user/verifyToken");
  return user;
}

async function logout() {
  try {
    await httpService.post("auth/logout");
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
}

type VerifyResetTokenResponse =
  | { success: true; email: string }
  | { success: false; message: string };

async function verifyResetToken(
  token: string
): Promise<VerifyResetTokenResponse> {
  try {
    const ans = await httpService.post<VerifyResetTokenResponse>(
      "auth/verify-reset-token",
      {
        token,
      }
    );
    return ans;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

interface ResetPassRequestState {
  ok: boolean;
  message: string;
}

async function sendResetTokenToMail(
  email: string
): Promise<ResetPassRequestState> {
  try {
    return await httpService.post<ResetPassRequestState>(
      "auth/request-password-reset",
      {
        email,
      }
    );
  } catch (err) {
    throw err;
  }
}

async function resetPassword(token: string, newPassword: string) {
  try {
    const ans: { message: string } = await httpService.post(
      "auth/reset-password",
      {
        token,
        newPassword,
      }
    );
    return ans;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function updateUser(user: User) {
  try {
    return await httpService.put("user", user);
  } catch (err) {
    console.log(err);
    throw err;
  }
}
