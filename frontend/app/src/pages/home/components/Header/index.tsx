import CartIcon from '../../../../assets/icons/cart.svg'
import SearchIcon from '../../../../assets/icons/search.svg'
import BagIcon from '../../../../assets/icons/bag.svg'
import Image from 'next/image'

export function Header() {
  return (
    <header className="flex justify-between items-center">
      <div className="logo px-3.5 py-2 rounded-full bg-Black-500 border-Green-300 border flex justify-center">
        <Image
          src={CartIcon}
          width={32}
          height={28}
          alt="ícone de carrinho de compras personalizado"
          className="text-Green-300"
        />
      </div>
      <nav className="flex gap-x-3">
        <a href="" className="rounded-full border border-Gray-300 block p-2.5">
          <Image
            src={SearchIcon}
            width={22}
            height={22}
            alt="ícone de uma lupa grande com cabo pequeno"
            className="text-Green-300"
          />
        </a>
        <a href="" className="rounded-full border border-Gray-300 block p-2.5">
          <Image
            src={BagIcon}
            width={24}
            height={24}
            alt="ícone de uma cesta com rosto feliz"
            className="text-Green-300"
          />
        </a>
      </nav>
    </header>
  )
}