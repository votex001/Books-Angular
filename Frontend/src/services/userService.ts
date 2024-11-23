import { httpService } from "./http.service";

export const userService = { signUp, confirmEmail, verifyToken };

async function signUp(credentials: object) {
  const data = httpService.post<any>("auth/signup", credentials);
  return data;
}

async function confirmEmail(email: string, code: string) {
  const data = await httpService.post<any>("auth/verify-email", {
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
