import { httpService } from "./http.service";

export const userService = { signUp };

async function signUp(credentials: object) {
  const data = httpService.post<any>("auth/signup", credentials);
  return data;
}
