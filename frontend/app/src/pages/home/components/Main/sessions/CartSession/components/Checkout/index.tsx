import { CaretLeft, Circle } from 'phosphor-react'
import { Button } from '@/layout/components/Button'
import { priceFormatter } from '@/layout/utils/formatters'
import { Div } from './styles'
import { useRef, useState } from 'react'
import CardIcon from '@/assets/icons/card.svg'
import PIXIcon from '@/assets/icons/pix.svg'
import Image from 'next/image'
import { useFeedback } from '@/layout/hooks/useFeedback'
import { authConsumer, client } from '@/code/settings/main'
import { IProductCartData } from '../..'
import { useRouter } from 'next/router'

export function Checkout({
  productsCart,
  totalValue,
  backToCart,
  goToLoginStep,
  goToSuccessStep,
  clearCart,
  inPopover,
}: {
  productsCart: IProductCartData[]
  totalValue: number
  backToCart: () => void
  goToLoginStep: () => void
  goToSuccessStep: () => void
  clearCart: () => void
  inPopover: boolean
}) {
  const { FeedbackElement, renderFeedback } = useFeedback()
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState<null | 'card' | 'pix'>(
    null,
  )
  const buying = useRef<boolean>(false)

  async function handleBuy() {
    const authInstance = authConsumer.repository.getAuthInstanceInClientSide()
    if (authInstance.isAuthenticated) {
      try {
        buying.current = true
        await client.post(
          'buy',
          {
            products: productsCart.map((product) => ({
              id: product.id,
              quantity: product.quantity,
            })),
            payment_method: paymentMethod,
          },
          {
            headers: {
              Authorization:
                authConsumer.clientManager.getAuthorizationHeaderFromAccessToken(
                  authInstance.accessToken!,
                ),
            },
          },
        )
        buying.current = false
        clearCart()
        goToSuccessStep()
      } catch {
        buying.current = false
        renderFeedback('error', {
          message: 'Não foi possível efetuar a compra',
        })
      }
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
          onClick={backToCart}
        />
        <h2 className="text-1xl font-bold inter leading-[29px] mt-4 sm:mt-10 flex">
          <CaretLeft
            size={28}
            className="absolute top-0 left-0 block sm:hidden cursor-pointer"
            onClick={backToCart}
          />
          <span className="tsm:grow tsm:text-center">Checkout</span>
        </h2>
        <h3 className="text-xs font-bold inter leading-[29px] mt-5 text-Gray-500">
          PAGAMENTO
        </h3>
        <div className="flex flex-col mt-3 gap-y-4">
          <Div.paymentType
            active={paymentMethod === 'card'}
            onClick={() => setPaymentMethod('card')}
            className="flex rounded-lg p-4 items-center gap-x-3.5"
          >
            <Image
              src={CardIcon}
              height={24}
              width={24}
              alt="Ícone de cartão mastercard"
            />
            <strong className="inter grow text-xs leading-[16px] text-Black-500">
              Cartão de crédito
            </strong>
            <Circle size={14} weight="fill" />
          </Div.paymentType>
          <Div.paymentType
            active={paymentMethod === 'pix'}
            onClick={() => setPaymentMethod('pix')}
            className="flex rounded-lg p-4 items-center gap-x-3.5"
          >
            <Image
              src={PIXIcon}
              height={24}
              width={24}
              alt="Ícone de cartão mastercard"
            />
            <strong className="inter grow text-xs leading-[16px] text-Black-500">
              PIX
            </strong>
            <Circle size={14} weight="fill" />
          </Div.paymentType>
        </div>
        <div className="block tsm:pt-10 tsm:pb-4 sm:fixed sm:bottom-0 sm:left-0 w-full sm:py-10 sm:px-6 bg-white">
          <div className="flex flex-col gap-y-2 sm:gap-y-8">
            <div className="flex flex-col gap-y-2">
              <div className="flex justify-between items-center">
                <span className="text-Gray-500 text-xs font-medium leading-[16px] inter">
                  Subtotal
                </span>
                <strong className="text-Gray-600 text-base leading-[22px]">
                  {priceFormatter.format(totalValue)}
                </strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-Gray-500 text-xs font-medium leading-[16px] inter">
                  Frete
                </span>
                <strong className="text-Gray-600 text-base leading-[22px]">
                  R$ 0,00
                </strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base font-bold leading-[22px] inter">
                  Total
                </span>
                <strong className="text-Orange-500 text-1xl leading-[29px]">
                  {priceFormatter.format(totalValue)}
                </strong>
              </div>
            </div>
            <Button
              className="custom-length py-3 sm:py-5 w-full text-sm sm:text-base font-medium leading-[22px]"
              variant="primary"
              disabled={paymentMethod === null}
              onClick={handleBuy}
              isSubmitting={buying.current}
            >
              Comprar
            </Button>
          </div>
        </div>
      </main>
    </>
  )
}
