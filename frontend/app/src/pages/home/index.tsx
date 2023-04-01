import { DepartmentModel } from '@/code/models/products'
import { useAtom } from 'jotai'
import { currentPageAtom } from './code/states'
import { Header } from './components/Header'
import { Main } from './components/Main'
import { Bag } from './components/Main/subcomponents/Bag'
import { IProductData } from './types'
import { useContextSelector } from 'use-context-selector'
import { CartContext } from '@/code/contexts/Cart'

export interface HomeProps {
  departments: DepartmentModel[]
  products: IProductData[]
}

export function Home(props: HomeProps) {
  const [page, setPage] = useAtom(currentPageAtom)
  const openCart = () => setPage('cart')
  const cart = useContextSelector(CartContext, (state) => ({
    products: state.products,
  }))
  const productsIdInCart = cart.products.map((product) => product.id)
  const productsForBuy = props.products.filter(
    (product) => !productsIdInCart.includes(product.id),
  )
  return (
    <div
      id="container"
      className="mt-8 grow max-w-[1148px] mx-auto flex flex-col"
    >
      <Header products={props.products} />
      <div
        id="main-container"
        className="max-w-[1024px] mx-auto flex flex-col w-full"
      >
        <Main {...props} productsForBuy={productsForBuy} />
        {!['cart', 'product', 'checkout'].includes(page) && (
          <Bag inHeader={false} onClick={openCart} />
        )}
      </div>
    </div>
  )
}
