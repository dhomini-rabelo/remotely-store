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
    if (product.quantity <= 0) {
      throw new Error('Quantidade inválida para produto')
    } else if (
      cart.products.find((productItem) => productItem.id === product.id)
    ) {
      throw new Error('O produto já está no carrinho')
    } else {
      cartDispatch(CartConsumer.addProduct(product))
    }
  }

  function removeProduct(productId: string) {
    if (cart.products.find((productItem) => productItem.id === productId)) {
      cartDispatch(CartConsumer.removeProduct(productId))
    } else {
      throw new Error('O produto não está no carrinho')
    }
  }

  function updateProductQuantity(product: IProductCart) {
    if (product.quantity <= 0) {
      throw new Error('Quantidade inválida para produto')
    } else if (
      !cart.products.find((productItem) => productItem.id === product.id)
    ) {
      throw new Error('O produto não está no carrinho')
    } else {
      cartDispatch(CartConsumer.updateProductQuantity(product))
    }
  }

  return (
    <CartContext.Provider
      value={{
        ...cart,
        actions: { addProduct, removeProduct, updateProductQuantity },
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
