import {
  UserAction,
  UserActionsTypes,
  UserState,
} from "../interface/user.store";

const initialState: UserState = {
  user: null,
};

export function userReducer(state = initialState, action = {} as UserAction) {
  var newState = state;

  switch (action.type) {
    case UserActionsTypes.SET_USER:
      newState = { ...state, user: action.user };
      break;
    case UserActionsTypes.EDIT_USER:
      newState = { ...state, user: { ...state.user, ...action.user } };
      break;
  }
  return newState;
}
