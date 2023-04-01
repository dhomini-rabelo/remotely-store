import { AuthUser } from './types'

/* eslint-disable */
export enum AuthActions {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}
/* eslint-enable */

export const AuthConsumer = {
  login(user: AuthUser) {
    return {
      type: AuthActions.LOGIN,
      payload: {
        user,
      },
    }
  },
  logout() {
    return {
      type: AuthActions.LOGOUT,
    }
  },
}
