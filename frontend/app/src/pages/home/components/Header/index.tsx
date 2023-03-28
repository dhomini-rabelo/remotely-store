import CartIcon from '../../../../assets/icons/cart.svg'
import SearchIcon from '../../../../assets/icons/search.svg'
// import BagIcon from '../../../../assets/icons/bag.svg'
import Image from 'next/image'
import { User } from 'phosphor-react'
import { Bag } from '../Main/subcomponents/Bag'

export function Header() {
  return (
    <header className="flex justify-between items-center">
      <div className="logo px-3.5 py-2 rounded-full bg-Black-500 border-Green-300 border flex justify-center">
        <Image
          src={CartIcon}
          className="w-[1.5rem] h-[1.5rem] sm:w-[1.375rem] sm:h-[1.375rem]"
          alt="ícone de carrinho de compras personalizado"
        />
      </div>
      <nav className="flex gap-x-3">
        <div className="rounded-full border border-Gray-300 p-2.5 sm:hidden flex items-center">
          <input
            type="text"
            className="bg-transparent px-0.5 text-base"
            placeholder="Buscar..."
            name="s"
          />
          <Image
            src={SearchIcon}
            className="w-[1.5rem] h-[1.5rem] sm:w-[1.375rem] sm:h-[1.375rem]"
            alt="ícone de uma lupa grande com cabo pequeno"
          />
        </div>
        <a
          href=""
          className="rounded-full border border-Gray-300 p-2.5 hidden sm:block"
        >
          <Image
            src={SearchIcon}
            className="w-[1.5rem] h-[1.5rem] sm:w-[1.375rem] sm:h-[1.375rem]"
            alt="ícone de uma lupa grande com cabo pequeno"
          />
        </a>
        <a
          href=""
          className="rounded-full border border-Gray-300 p-2.5 flex items-end gap-x-2"
        >
          <User className="w-[1.5rem] h-[1.5rem] sm:w-[1.375rem] sm:h-[1.375rem] text-Black-500" />
          <span className="text-lg sm:hidden">Conta</span>
        </a>
        <Bag inHeader={true} />
      </nav>
    </header>
  )
}
