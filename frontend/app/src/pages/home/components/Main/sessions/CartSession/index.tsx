import { useState } from 'react'
import { Cart } from './components/Cart'
import { IProductData } from '@/pages/home/types'
import { useContextSelector } from 'use-context-selector'
import { CartContext } from '@/code/contexts/Cart'
import { Checkout } from './components/Checkout'
import { SuccessStep } from './components/SuccessStep'
import { LoginStep } from './components/Login'

export interface IProductCartData extends IProductData {
  quantity: number
}

/* eslint-disable */
export function CartSession({
  products,
  inPopover,
}: {
  products: IProductData[]
  inPopover: boolean
}) {
  const [cartPage, setCartPage] = useState<
    'cart' | 'checkout' | 'success' | 'login'
  >('cart')
  const { cart, clearCart } = useContextSelector(CartContext, (state) => ({
    cart: { products: state.products },
    clearCart: state.actions.clearCart,
  }))
  const productsCart = cart.products
    .map((productCart) => {
      const product = products.find(
        (productItem) => productItem.id === productCart?.id,
      )
      return product
        ? {
          ...product,
          quantity: productCart.quantity,
        }
        : null
    })
    .filter((product) => product !== null) as IProductCartData[]
  const financialReport = {
    totalValue: productsCart.reduce(
      (valueCounter, product) =>
        product.price.currentValue * product.quantity + valueCounter,
      0,
    ),
  }
  const goToCheckout = () => setCartPage('checkout')
  const goToLoginStep = () => setCartPage('login')
  const backToCart = () => setCartPage('cart')
  const goToSuccessStep = () => setCartPage('success')

  switch (cartPage) {
    case 'cart':
      return (
        <Cart
          inPopover={inPopover}
          productsCart={productsCart}
          goToLoginStep={goToLoginStep}
          goToCheckout={goToCheckout}
          totalValue={financialReport.totalValue}
        />
      )
    case 'checkout':
      return (
        <Checkout
          clearCart={clearCart}
          inPopover={inPopover}
          productsCart={productsCart}
          goToLoginStep={goToLoginStep}
          goToSuccessStep={goToSuccessStep}
          totalValue={financialReport.totalValue}
          backToCart={backToCart}
        />
      )
    case 'success':
      return <SuccessStep />
    case 'login':
      return <LoginStep />
  }
}
