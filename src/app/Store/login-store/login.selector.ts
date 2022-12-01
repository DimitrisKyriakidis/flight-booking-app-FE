import { createFeatureSelector, createSelector } from '@ngrx/store'
import { LoginState } from './login.state'

export const loginState = createFeatureSelector<LoginState>('login')
export const selectIsLoggenIn = createSelector(
  loginState,
  (state) => state.isLoggedIn
)
export const selectUser = createSelector(loginState, (state) => state.user)
export const getToken = createSelector(loginState, (state) => {
  return state.user ? state.user.userToken : null
})
