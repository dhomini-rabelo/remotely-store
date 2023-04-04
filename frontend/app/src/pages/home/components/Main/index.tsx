import { useAtom } from 'jotai'
import { HomeProps } from '../..'
import { currentPageAtom, searchTextAtom } from '../../code/states'
import { ProductDetail } from './subcomponents/ProductDetail'
import { Search } from './subcomponents/Search'
import { IProductData } from '../../types'
import { CartSession } from './sessions/CartSession'
import { DefaultMain } from './subcomponents/Default'

export interface MainProps extends HomeProps {
  productsForBuy: IProductData[]
}

export function Main({ departments, products, productsForBuy }: MainProps) {
  const [page] = useAtom(currentPageAtom)
  const [search] = useAtom(searchTextAtom)

  if (page === 'home' || (page === 'search' && search === '')) {
    return (
      <DefaultMain
        products={products}
        departments={departments}
        productsForBuy={productsForBuy}
      />
    )
  } else if (page === 'search') {
    return <Search search={search} productsForBuy={productsForBuy} />
  } else if (page === 'product') {
    return <ProductDetail productsForBuy={productsForBuy} />
  } else if (page === 'cart') {
    return <CartSession products={products} inPopover={false} />
  } else {
    throw new Error('Invalid page')
  }
}
