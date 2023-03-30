import { ReactNode, useReducer } from 'react'
import { createContext } from 'use-context-selector'
import { CartContextType } from './types'
import { CartReducer } from './reducer'

export const CartContext = createContext<CartContextType>({} as CartContextType)

export function CartProvider({ children }: { children: ReactNode }) {
  /* eslint-disable */
  const [cart, cartDispatch] = useReducer(
    CartReducer,
    {
      products: []
    },
  )
  /* eslint-enable */

  return (
    <CartContext.Provider value={{ ...cart, actions: {} }}>
      {children}
    </CartContext.Provider>
  )
}
