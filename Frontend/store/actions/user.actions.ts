import { User } from "../../src/assets/models/user.model";
import { UserActionsTypes } from "../interface/user.store";
import { store } from "../store";
import { userService } from "../../src/services/userService";

export async function login(credentials?: {
  email: string;
  password: string;
}): Promise<User | null> {
  var user: User | null = null;
  try {
    if (credentials) {
      user = await userService.login(credentials);
    } else {
      user = await userService.verifyToken();
    }
    if (user) {
      store.dispatch({ type: UserActionsTypes.SET_USER, user });
    }
    return user;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
