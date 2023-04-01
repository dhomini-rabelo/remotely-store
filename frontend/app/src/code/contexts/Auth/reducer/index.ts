import { AuthActions } from './actions'
import { AuthReducerAction, AuthType } from './types'

export function AuthReducer(
  state: AuthType,
  action: AuthReducerAction,
): AuthType {
  switch (action.type) {
    case AuthActions.LOGIN:
      return {
        auth: {
          isAuthenticated: true,
        },
        user: {
          id: action.payload.user.id,
          email: action.payload.user.email,
        },
      }
    case AuthActions.LOGOUT:
      return {
        auth: {
          isAuthenticated: false,
        },
        user: null,
      }
  }
}
