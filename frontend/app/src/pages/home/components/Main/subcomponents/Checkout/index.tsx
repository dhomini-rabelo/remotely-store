import { CartContext } from '@/code/contexts/Cart'
import { currentPageAtom } from '@/pages/home/code/states'
import { useAtom } from 'jotai'
import { CaretLeft, Circle, CreditCard, Money } from 'phosphor-react'
import { useContextSelector } from 'use-context-selector'
import { IProductData } from '@/pages/home/types'
import { Button } from '@/layout/components/Button'
import { priceFormatter } from '@/code/utils/layout/formatters'
import { IProductCartData } from '../Cart'

export function Checkout({ products }: { products: IProductData[] }) {
  const [, setPage] = useAtom(currentPageAtom)
  const backToHome = () => setPage('home')
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
  return (
    <>
      <main id="cart-container" className="relative bg-white">
        <CaretLeft
          size={28}
          className="absolute top-0 left-0 sm:block hidden"
          onClick={backToHome}
        />
        <h2 className="text-1xl font-bold inter lh-29 mt-4 sm:mt-10">
          Checkout
        </h2>
        <h3 className="text-xs font-bold inter lh-29 mt-5 lh-16 text-Gray-500">
          PAGAMENTO
        </h3>
        <div className="flex flex-col mt-3 gap-y-4">
          <div
            className="flex rounded-lg p-4 items-center gap-x-3.5"
            style={{ border: '0.6px solid #8ADD4B' }}
          >
            <CreditCard size={24} />
            <strong className="inter grow text-xs lh-16">
              Cartão de crédito
            </strong>
            <Circle size={14} weight="fill" className="text-[#8ADD4B]" />
          </div>
          <div
            className="flex rounded-lg p-4 items-center gap-x-3.5"
            style={{ border: '0.6px solid #DDDDDB' }}
          >
            <Money size={24} />
            <strong className="inter grow text-xs lh-16">PIX</strong>
            <Circle size={14} weight="fill" className="text-[#DDDDDB]" />
          </div>
        </div>
        <div className="block sm:hidden w-full pt-10 pb-4 bg-white">
          <div className="flex flex-col gap-y-2">
            <div className="flex justify-between items-center">
              <span className="text-base font-bold lh-22 inter">Total</span>
              <strong className="text-Orange-500 text-1xl lh-29">
                {priceFormatter.format(financialReport.totalValue)}
              </strong>
            </div>
            <Button
              className="custom-length py-3 w-full text-sm font-medium lh-22"
              variant="primary"
            >
              Comprar
            </Button>
          </div>
        </div>
        <div className="hidden sm:block fixed bottom-0 left-0 w-full py-10 px-6 bg-white">
          <div className="flex flex-col gap-y-8">
            <div className="flex flex-col gap-y-2">
              <div className="flex justify-between items-center">
                <span className="text-Gray-500 text-xs font-medium lh-16 inter">
                  Subtotal
                </span>
                <strong className="text-Gray-600 text-base lh-22">
                  {priceFormatter.format(financialReport.totalValue)}
                </strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-Gray-500 text-xs font-medium lh-16 inter">
                  Frete
                </span>
                <strong className="text-Gray-600 text-base lh-22">
                  R$ 0,00
                </strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base font-bold lh-22 inter">Total</span>
                <strong className="text-Orange-500 text-1xl lh-29">
                  {priceFormatter.format(financialReport.totalValue)}
                </strong>
              </div>
            </div>
            <Button
              className="custom-length py-5 w-full text-base font-medium lh-22"
              variant="primary"
            >
              Comprar
            </Button>
          </div>
        </div>
      </main>
    </>
  )
}
