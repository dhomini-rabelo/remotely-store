import { currentPageAtom } from '@/pages/home/code/states'
import { useAtom } from 'jotai'
import { ArrowRight, CaretLeft } from 'phosphor-react'
import { ProductCart } from './subcomponents/ProductCart'
import { IProductCartData } from '../..'
import { useRouter } from 'next/router'
import { useFeedback } from '@/layout/hooks/useFeedback'
import { priceFormatter } from '@/code/utils/layout/formatters'
import { Button } from '@/layout/components/Button'
import { authConsumer } from '@/code/settings/main'

export function Cart({
  productsCart,
  totalValue,
  goToCheckout,
  goToLoginStep,
  inPopover,
}: {
  productsCart: IProductCartData[]
  totalValue: number
  goToCheckout: () => void
  goToLoginStep: () => void
  inPopover: boolean
}) {
  const [, setPage] = useAtom(currentPageAtom)
  const backToHome = () => setPage('home')
  const { FeedbackElement, renderFeedback } = useFeedback()
  const router = useRouter()

  function handleGoToCheckout() {
    const authInstance = authConsumer.repository.getAuthInstanceInClientSide()
    if (authInstance.isAuthenticated) {
      goToCheckout()
    } else if (inPopover) {
      goToLoginStep()
    } else {
      renderFeedback('error', {
        message: 'Você precisa estar logado para continuar',
        onClose: () => {
          router.push('/login')
        },
      })
    }
  }

  return (
    <>
      {FeedbackElement}
      <main id="cart-container" className="relative bg-white">
        <CaretLeft
          size={28}
          className="absolute top-0 left-0 sm:block hidden"
          onClick={backToHome}
        />
        <div className="flex justify-between items-center mt-4 sm:mt-10">
          <h2 className="text-1xl font-bold inter leading-[29px]">Carrinho</h2>
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
        <div className="block tsm:pt-10 tsm:pb-4 sm:fixed sm:bottom-0 sm:left-0 w-full sm:py-10 sm:px-6 bg-white">
          <div className="flex flex-col gap-y-2 sm:gap-y-8">
            <div className="flex justify-between items-center">
              <span className="text-base font-bold leading-[22px] inter">
                Total
              </span>
              <strong className="text-Orange-500 text-1xl leading-[29px]">
                {priceFormatter.format(totalValue)}
              </strong>
            </div>
            <Button
              className="custom-length py-3 sm:py-5 w-full text-sm sm:text-base font-medium leading-[22px] flex justify-center items-center gap-x-1"
              variant="primary"
              disabled={productsCart.length < 1}
              onClick={handleGoToCheckout}
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
