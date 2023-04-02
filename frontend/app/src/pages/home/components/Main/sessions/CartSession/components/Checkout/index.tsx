import { CaretLeft, Circle } from 'phosphor-react'
import { Button } from '@/layout/components/Button'
import { priceFormatter } from '@/code/utils/layout/formatters'
import { Div } from './styles'
import { useRef, useState } from 'react'
import CardIcon from '@/assets/icons/card.svg'
import PIXIcon from '@/assets/icons/pix.svg'
import Image from 'next/image'
import { useFeedback } from '@/layout/hooks/useFeedback'
import { client } from '@/code/settings/main'
import { IProductCartData } from '../..'
import { authConsumer } from '@/code/modules/Auth'
import { useRouter } from 'next/router'

export function Checkout({
  productsCart,
  totalValue,
  backToCart,
  goToSuccessStep,
}: {
  productsCart: IProductCartData[]
  totalValue: number
  backToCart: () => void
  goToSuccessStep: () => void
}) {
  const { FeedbackElement, renderFeedback } = useFeedback()
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState<null | 'card' | 'pix'>(
    null,
  )
  const buying = useRef<boolean>(false)

  async function buy() {
    const authInstance = authConsumer.getAuthInstanceInClientSide()
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
              Authorization: authConsumer.getAuthorizationHeaderFromAccessToken(
                authInstance.accessToken!,
              ),
            },
          },
        )
        buying.current = false
        goToSuccessStep()
      } catch {
        buying.current = false
        renderFeedback('error', {
          message: 'Não foi possível efetuar a compra',
        })
      }
    } else {
      renderFeedback('error', {
        message: 'Você não está logado',
        onClose: () => router.push('/login'),
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
        <h2 className="text-1xl font-bold inter lh-29 mt-4 sm:mt-10 flex">
          <CaretLeft
            size={28}
            className="absolute top-0 left-0 block sm:hidden cursor-pointer"
            onClick={backToCart}
          />
          <span className="tsm:grow tsm:text-center">Checkout</span>
        </h2>
        <h3 className="text-xs font-bold inter lh-29 mt-5 lh-16 text-Gray-500">
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
            <strong className="inter grow text-xs lh-16 text-Black-500">
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
            <strong className="inter grow text-xs lh-16 text-Black-500">
              PIX
            </strong>
            <Circle size={14} weight="fill" />
          </Div.paymentType>
        </div>
        <div className="block sm:hidden w-full pt-10 pb-4 bg-white">
          <div className="flex flex-col gap-y-2">
            <div className="flex flex-col gap-y-2">
              <div className="flex justify-between items-center">
                <span className="text-Gray-500 text-xs font-medium lh-16 inter">
                  Subtotal
                </span>
                <strong className="text-Gray-600 text-base lh-22">
                  {priceFormatter.format(totalValue)}
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
                  {priceFormatter.format(totalValue)}
                </strong>
              </div>
            </div>
            <Button
              className="custom-length py-3 w-full text-sm font-medium lh-22"
              variant="primary"
              disabled={paymentMethod === null}
              onClick={buy}
              isSubmitting={buying.current}
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
                  {priceFormatter.format(totalValue)}
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
                  {priceFormatter.format(totalValue)}
                </strong>
              </div>
            </div>
            <Button
              className="custom-length py-5 w-full text-base font-medium lh-22"
              variant="primary"
              disabled={paymentMethod === null}
              onClick={buy}
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
