import { Reducer } from "react";
import { UserAction, UserState } from "./interface/user.store";
import { combineReducers, legacy_createStore as createStore } from "redux";
import { userReducer } from "./reduces/user.reducer";

const middleware = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
  : undefined;

export interface RootState {
  userModule: UserState;
}

type RootAction = UserAction;
type RootReducer = Reducer<RootState, RootAction>;

const rootReducer = combineReducers({
  userModule: userReducer,
}) as RootReducer;

export const store = createStore(rootReducer, middleware);
