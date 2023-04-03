import { AuthActions } from './actions'

export type AuthReducerAction = {
  type: AuthActions
  payload?: any
}

export interface AuthUser {
  id: string
  email: string
  business: {
    id: string
    status: string
    payment_method: 'pix' | 'card'
    total_value: number
    created_at: string
    code: string
    itens_quantity: number
  }[]
}

export interface AuthType {
  auth: {
    isAuthenticated: boolean
  }
  user: null | AuthUser
}
