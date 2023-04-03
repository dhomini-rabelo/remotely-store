import Link from 'next/link'
import CartIcon from '@/assets/icons/cart.svg'
import Image from 'next/image'
import { CaretLeft } from 'phosphor-react'
import BagIcon from '@/assets/icons/bag.svg'

export function Header() {
  return (
    <header className="flex justify-between items-center relative">
      <Link href="/">
        <CaretLeft size={28} />
      </Link>
      <Link href="/" className="">
        <div className="flex items-center justify-center text-center gap-x-2">
          <div className="logo px-3.5 py-2 rounded-full bg-Black-500 border-Green-300 border flex justify-center">
            <Image
              src={CartIcon}
              className="w-[1.5rem] h-[1.5rem] sm:w-[1.375rem] sm:h-[1.375rem]"
              alt="ícone de carrinho de compras personalizado"
            />
          </div>
          <h2 className="font-bold text-xl text-Green-300">Remotely.io</h2>
        </div>
      </Link>
      <Link href="/" className="flex items-center gap-x-2">
        <Image
          src={BagIcon}
          width={28}
          height={28}
          alt="ícone de cesta de compras"
        />
        <span className="block sm:hidden text-lg">Produtos</span>
      </Link>
    </header>
  )
}
