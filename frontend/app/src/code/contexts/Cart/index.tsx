import { ReactNode, useCallback, useEffect, useReducer } from 'react'
import { createContext } from 'use-context-selector'
import { CartContextType, IProductCart, ICart } from './types'
import { CartReducer } from './reducer'
import { CartConsumer } from './reducer/actions'
import { APPLICATION_NAME } from '@/code/settings/main'

export const CartContext = createContext<CartContextType>({} as CartContextType)

export function CartProvider({ children }: { children: ReactNode }) {
  const SAVE_KEY = `@${APPLICATION_NAME}-CART-KEY`
  /* eslint-disable */
  const [cart, cartDispatch] = useReducer(
    CartReducer,
    {
      products: []
    },
  )

  useEffect(() => {
    const localStorageSavedCart = localStorage.getItem(SAVE_KEY)
    if (localStorageSavedCart) {
      const localStorageCart = JSON.parse(localStorageSavedCart) as ICart
      const isValidStorageCart = localStorageCart.products && localStorageCart.products.every(product => product.id && product.quantity)
      if (isValidStorageCart) {
        localStorageCart.products.map(product => addProduct(product))
      }
    }
  }, [])

  useEffect(() => {
    saveCart()
  }, [cart])

  /* eslint-enable */

  const addProduct = useCallback(
    (product: IProductCart) => {
      if (product.quantity <= 0) {
        throw new Error('Quantidade inválida para produto')
      } else if (
        cart.products.find((productItem) => productItem.id === product.id)
      ) {
        throw new Error('O produto já está no carrinho')
      } else {
        cartDispatch(CartConsumer.addProduct(product))
      }
    },
    [cart.products],
  )

  const removeProduct = useCallback(
    (productId: string) => {
      if (cart.products.find((productItem) => productItem.id === productId)) {
        cartDispatch(CartConsumer.removeProduct(productId))
      } else {
        throw new Error('O produto não está no carrinho')
      }
    },
    [cart.products],
  )

  const updateProductQuantity = useCallback(
    (product: IProductCart) => {
      if (product.quantity <= 0) {
        throw new Error('Quantidade inválida para produto')
      } else if (
        !cart.products.find((productItem) => productItem.id === product.id)
      ) {
        throw new Error('O produto não está no carrinho')
      } else {
        cartDispatch(CartConsumer.updateProductQuantity(product))
      }
    },
    [cart.products],
  )

  const clearCart = useCallback(() => {
    cartDispatch(CartConsumer.clearCart())
  }, [])

  function saveCart() {
    localStorage.setItem(SAVE_KEY, JSON.stringify(cart))
  }

  return (
    <CartContext.Provider
      value={{
        ...cart,
        actions: {
          addProduct,
          removeProduct,
          updateProductQuantity,
          clearCart,
        },
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
