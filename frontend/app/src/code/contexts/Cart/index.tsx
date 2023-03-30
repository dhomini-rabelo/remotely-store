import { ReactNode, useReducer } from 'react'
import { createContext } from 'use-context-selector'
import { CartContextType, IProductCart } from './types'
import { CartReducer } from './reducer'
import { CartConsumer } from './reducer/actions'

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

  function addProduct(product: IProductCart) {
    if (product.quantity > 0) {
      cartDispatch(CartConsumer.addProduct(product))
    } else {
      throw new Error('Quantidade inválida para produto')
    }
  }

  return (
    <CartContext.Provider value={{ ...cart, actions: { addProduct } }}>
      {children}
    </CartContext.Provider>
  )
}
