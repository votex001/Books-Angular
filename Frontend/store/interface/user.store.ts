import { User } from "../../src/assets/models/user.model";

export interface UserState {
  user: User | null;
}

export enum UserActionsTypes {
  SET_USER = "SET_USER",
  EDIT_USER = "EDIT_USER",
}

interface SetUserAction {
  type: UserActionsTypes.SET_USER;
  user: User;
}

interface EditUserAction {
  type: UserActionsTypes.EDIT_USER;
  user: User;
}

export type UserAction = SetUserAction | EditUserAction;
