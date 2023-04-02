import { useState } from 'react'
import { Cart } from './components/Cart'
import { IProductData } from '@/pages/home/types'
import { useContextSelector } from 'use-context-selector'
import { CartContext } from '@/code/contexts/Cart'
import { Checkout } from './components/Checkout'

export interface IProductCartData extends IProductData {
  quantity: number
}

export function CartSession({ products }: { products: IProductData[] }) {
  const [cartPage, setCartPage] = useState<'cart' | 'checkout' | 'success'>(
    'cart',
  )
  const cart = useContextSelector(CartContext, (state) => ({
    products: state.products,
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
  const backToCart = () => setCartPage('cart')

  switch (cartPage) {
    case 'cart':
      return (
        <Cart
          productsCart={productsCart}
          goToCheckout={goToCheckout}
          totalValue={financialReport.totalValue}
        />
      )
    case 'checkout':
      return (
        <Checkout
          totalValue={financialReport.totalValue}
          backToCart={backToCart}
        />
      )
    case 'success':
      return <div></div>
  }
}
