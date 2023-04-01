import { AuthType, AuthUser } from './reducer/types'

export interface AuthContextType extends AuthType {
  actions: {
    login: (accessToken: string, user: AuthUser) => void
    logout: () => void
  }
}
