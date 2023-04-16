import { ReactNode, useCallback, useEffect, useReducer } from 'react'
import { AuthReducer } from './reducer'
import { AuthConsumer } from './reducer/actions'
import { AuthContextType } from './types'
import { AuthUser } from './reducer/types'
import { authConsumer, client } from '@/code/settings/main'
import { createContext } from 'use-context-selector'

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }) {
  /* eslint-disable */
  const [auth, authDispatch] = useReducer(
    AuthReducer,
    {
      auth: {
        isAuthenticated: false,
      },
      user: null,
    },
  )
  /* eslint-enable */

  useEffect(() => {
    const authInstance = authConsumer.repository.getAuthInstanceInClientSide()
    if (authInstance.isAuthenticated && auth.user === null) {
      authConsumer.clientManager.configureAuthClient(client, {
        accessToken: authInstance.accessToken,
      })
      client.get('/me').then((response) => {
        authDispatch(AuthConsumer.login(response.data))
      })
    }
  }, [auth])

  const login = useCallback((accessToken: string, user: AuthUser) => {
    authDispatch(AuthConsumer.login(user))
    authConsumer.clientManager.configureAuthClient(client, {
      accessToken,
    })
    authConsumer.repository.saveAuthInstance({
      accessToken,
    })
  }, [])

  const logout = useCallback(() => {
    authConsumer.repository.killAuthInstanceInClientSide()
    authDispatch(AuthConsumer.logout())
  }, [])

  return (
    <AuthContext.Provider value={{ ...auth, actions: { login, logout } }}>
      {children}
    </AuthContext.Provider>
  )
}
