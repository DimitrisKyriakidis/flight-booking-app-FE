import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared/models/user.model';

export const enum ActionLoginTypes {
  loginAction = '[Login] login user',
  loginSuccess = '[Login] login user Success',
  loginFail = '[Login] login user fail',
  logout = '[User] logout',
  userLoggedIn = '[User] Logged In',
  redirectDone = 'redirect page',
}

export const login = createAction(
  ActionLoginTypes.loginAction,
  props<{ username: string; password: string }>()
);

export const loginSuccess = createAction(
  ActionLoginTypes.loginSuccess,
  props<{ user: User }>()
);

export const loginFail = createAction(
  ActionLoginTypes.loginFail,
  props<{ error: string }>()
);
export const logout = createAction(ActionLoginTypes.logout);
export const userLoggedIn = createAction(ActionLoginTypes.userLoggedIn);
