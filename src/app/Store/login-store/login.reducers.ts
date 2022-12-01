import { createReducer, on } from '@ngrx/store'
import { login, loginSuccess, logout, userLoggedIn } from './login.actions'
import { initialLoginState } from './login.state'

export const _loginReducer = createReducer(
  initialLoginState,
  on(login, (state, action) => {
    return {
      ...state,
      isLoggedIn: false,
      // user:null
    }
  }),
  on(loginSuccess, (state, action) => {
    return {
      ...state,
      isLoggedIn: true,
      user: action.user,
    }
  }),
  on(userLoggedIn, (state, action) => {
    return {
      ...state,
      isLoggedIn: true,
    }
  }),
  on(logout, (state, action) => {
    return {
      ...state,
      isLoggedIn: false,
    }
  })
)

export function loginReducer(state, action) {
  return _loginReducer(state, action)
}
