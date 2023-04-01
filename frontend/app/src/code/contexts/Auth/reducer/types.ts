import { AuthActions } from './actions'

export type AuthReducerAction = {
  type: AuthActions
  payload?: any
}

export interface AuthUser {
  id: string
  email: string
}

export interface AuthType {
  auth: {
    isAuthenticated: boolean
  }
  user: null | AuthUser
}
