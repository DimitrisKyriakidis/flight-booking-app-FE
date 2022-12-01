import { User } from 'src/app/shared/models/user.model';

export interface LoginState {
  user: User;
  isLoggedIn: boolean;
}
export const initialLoginState: LoginState = {
  user: null,
  isLoggedIn: false,
};
