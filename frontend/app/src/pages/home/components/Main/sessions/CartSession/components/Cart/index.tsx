import { currentPageAtom } from '@/pages/home/code/states'
import { useAtom } from 'jotai'
import { CaretLeft } from 'phosphor-react'
import { ProductCart } from './subcomponents/ProductCart'
import { IProductCartData } from '../..'
import { authConsumer } from '@/code/modules/Auth'
import { useRouter } from 'next/router'
import { useFeedback } from '@/layout/hooks/useFeedback'
import { CheckoutContainer } from './subcomponents/CheckoutButton'

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
    const authInstance = authConsumer.getAuthInstanceInClientSide()
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
          <CheckoutContainer
            totalValue={totalValue}
            disabled={productsCart.length < 1}
            onClick={handleGoToCheckout}
          />
        </div>
        <div className="hidden sm:block fixed bottom-0 left-0 w-full py-10 px-6 bg-white">
          <CheckoutContainer
            totalValue={totalValue}
            disabled={productsCart.length < 1}
            onClick={handleGoToCheckout}
          />
        </div>
      </main>
    </>
  )
}
