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
        user: action.payload.user,
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
