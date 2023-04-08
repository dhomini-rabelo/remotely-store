import { useAtom } from 'jotai'
import { HomeProps } from '../..'
import { currentPageAtom, searchTextAtom } from '../../code/states'
import { ProductDetail } from './subcomponents/ProductDetail'
import { Search } from './subcomponents/Search'
import { IProductData } from '../../types'
import { CartSession } from './sessions/CartSession'
import { DefaultMain } from './subcomponents/Default'
import { useEffect } from 'react'

export interface MainProps extends HomeProps {
  productsForBuy: IProductData[]
}

export function Main({
  departments,
  products,
  productsForBuy,
  banner,
}: MainProps) {
  const [page, setPage] = useAtom(currentPageAtom)
  const [search] = useAtom(searchTextAtom)

  useEffect(() => {
    setPage('home')
  }, [setPage])

  if (page === 'home' || (page === 'search' && search === '')) {
    return (
      <DefaultMain
        banner={banner}
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
