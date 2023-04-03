import CartIcon from '../../../../assets/icons/cart.svg'
import SearchIcon from '../../../../assets/icons/search.svg'
import Image from 'next/image'
import { useAtom } from 'jotai'
import { ArrowRight, User } from 'phosphor-react'
import { currentPageAtom, searchTextAtom } from '../../code/states'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { IProductData } from '../../types'
import { BagPopover } from './subcomponents/BagPopover'
import { authConsumer } from '@/code/modules/Auth'
import Link from 'next/link'

export function Header({ products }: { products: IProductData[] }) {
  const [page, setPage] = useAtom(currentPageAtom)
  const [search, setSearch] = useAtom(searchTextAtom)
  const [showSearch, setShowSearch] = useState(false)
  const searchInput = useRef<null | HTMLInputElement>(null)
  const isAuthenticated = useRef<null | boolean>(null)

  useEffect(() => {
    const authInstance = authConsumer.getAuthInstanceInClientSide()
    isAuthenticated.current = authInstance.isAuthenticated
  }, [])

  useEffect(() => {
    if (showSearch) {
      searchInput.current!.focus()
    }
  }, [showSearch])

  function handleDoSearch(e: ChangeEvent<HTMLInputElement>) {
    const searchText = e.currentTarget.value
    setSearch(e.currentTarget.value)
    if (searchText !== '' && page !== 'search') {
      setPage('search')
    }
  }

  function handleSearchInCellPhone() {
    setShowSearch(true)
  }

  function handleShowOptionsInCellPhone() {
    if (showSearch && search === '') {
      setShowSearch(false)
    }
  }

  return (
    <header
      className={`flex justify-between items-center ${!['home', 'search'].includes(page) && 'hidden'
        }`}
    >
      <div className="flex items-center justify-center text-center gap-x-2">
        <div className="logo px-3.5 py-2 rounded-full bg-Black-500 border-Green-300 border flex justify-center">
          <Image
            src={CartIcon}
            className="w-[1.5rem] h-[1.5rem] sm:w-[1.375rem] sm:h-[1.375rem]"
            alt="ícone de carrinho de compras personalizado"
          />
        </div>
        <h2 className="font-bold text-xl text-Green-300 block md:hidden">
          Remotely.io
        </h2>
      </div>
      <nav className="flex gap-x-3">
        <div
          className={`${!showSearch && 'sm:hidden'
            } rounded-full border border-Gray-300 p-2.5 flex items-center`}
        >
          <input
            type="text"
            className="bg-transparent px-1 text-base w-full"
            placeholder="Buscar..."
            value={search}
            onBlur={handleShowOptionsInCellPhone}
            ref={searchInput}
            onChange={handleDoSearch}
            name="s"
          />
          <Image
            src={SearchIcon}
            className="w-[1.5rem] h-[1.5rem] sm:w-[1.375rem] sm:h-[1.375rem]"
            alt="ícone de uma lupa grande com cabo pequeno"
          />
        </div>
        {!showSearch && (
          <>
            <div
              onClick={handleSearchInCellPhone}
              className="rounded-full border border-Gray-300 p-2.5 hidden sm:block"
            >
              <Image
                src={SearchIcon}
                className="w-[1.5rem] h-[1.5rem] sm:w-[1.375rem] sm:h-[1.375rem]"
                alt="ícone de uma lupa grande com cabo pequeno"
              />
            </div>
            {isAuthenticated.current === false && (
              <Link
                href="/login"
                className="rounded-full border border-Gray-300 p-2.5 flex items-end gap-x-2"
              >
                <ArrowRight className="w-[1.5rem] h-[1.5rem] sm:w-[1.375rem] sm:h-[1.375rem] text-Black-500 tsm:relative tsm:bottom-0.5" />
                <span className="text-lg sm:hidden">Entrar</span>
              </Link>
            )}
            {isAuthenticated.current === true && (
              <Link
                href="/minha-conta"
                className="rounded-full border border-Gray-300 p-2.5 flex items-end gap-x-2"
              >
                <User className="w-[1.5rem] h-[1.5rem] sm:w-[1.375rem] sm:h-[1.375rem] text-Black-500" />
                <span className="text-lg sm:hidden">Conta</span>
              </Link>
            )}
            <BagPopover products={products} />
          </>
        )}
      </nav>
    </header>
  )
}
