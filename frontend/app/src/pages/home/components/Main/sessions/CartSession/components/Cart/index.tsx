import { currentPageAtom } from '@/pages/home/code/states'
import { useAtom } from 'jotai'
import { ArrowRight, CaretLeft } from 'phosphor-react'
import { ProductCart } from './subcomponents/ProductCart'
import { Button } from '@/layout/components/Button'
import { priceFormatter } from '@/code/utils/layout/formatters'
import { IProductCartData } from '../..'

export function Cart({
  productsCart,
  totalValue,
  goToCheckout,
}: {
  productsCart: IProductCartData[]
  totalValue: number
  goToCheckout: () => void
}) {
  const [, setPage] = useAtom(currentPageAtom)
  const backToHome = () => setPage('home')

  return (
    <>
      <main id="cart-container" className="relative bg-white">
        <CaretLeft
          size={28}
          className="absolute top-0 left-0 sm:block hidden"
          onClick={backToHome}
        />
        <div className="flex justify-between items-center mt-4 sm:mt-10">
          <h2 className="text-1xl font-bold inter lh-29">Carrinho</h2>
          <div className="text-Gray-500 flex items-center gap-x-2">
            <span className="text-xs">
              {productsCart.length} {productsCart.length > 1 ? 'itens' : 'item'}
            </span>
          </div>
        </div>
        <div className="flex flex-col mt-6 gap-y-3 max-h-[1000px]">
          {productsCart.map((productCart) => (
            <ProductCart key={productCart.id} product={productCart} />
          ))}
        </div>
        <div className="block sm:hidden w-full pt-10 pb-4 bg-white">
          <div className="flex flex-col gap-y-2">
            <div className="flex justify-between items-center">
              <span className="text-base font-bold lh-22 inter">Total</span>
              <strong className="text-Orange-500 text-1xl lh-29">
                {priceFormatter.format(totalValue)}
              </strong>
            </div>
            <Button
              className="custom-length py-3 w-full text-sm font-medium lh-22 flex justify-center items-center gap-x-1"
              variant="primary"
              disabled={productsCart.length < 1}
              onClick={goToCheckout}
            >
              Checkout
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
        <div className="hidden sm:block fixed bottom-0 left-0 w-full py-10 px-6 bg-white">
          <div className="flex flex-col gap-y-8">
            <div className="flex justify-between items-center">
              <span className="text-base font-bold lh-22 inter">Total</span>
              <strong className="text-Orange-500 text-1xl lh-29">
                {priceFormatter.format(totalValue)}
              </strong>
            </div>
            <Button
              className="custom-length py-5 w-full text-base font-medium lh-22 flex justify-center items-center gap-x-1"
              variant="primary"
              disabled={productsCart.length < 1}
              onClick={goToCheckout}
            >
              Checkout
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </main>
    </>
  )
}
