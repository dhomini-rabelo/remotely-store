import { CaretLeft, Circle } from 'phosphor-react'
import { Button } from '@/layout/components/Button'
import { priceFormatter } from '@/code/utils/layout/formatters'
import { Div } from './styles'
import { useState } from 'react'
import CardIcon from '@/assets/icons/card.svg'
import PIXIcon from '@/assets/icons/pix.svg'
import Image from 'next/image'

export function Checkout({
  totalValue,
  backToCart,
}: {
  totalValue: number
  backToCart: () => void
}) {
  const [paymentMethod, setPaymentMethod] = useState<null | 'CARD' | 'PIX'>(
    null,
  )

  return (
    <>
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
            active={paymentMethod === 'CARD'}
            onClick={() => setPaymentMethod('CARD')}
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
            active={paymentMethod === 'PIX'}
            onClick={() => setPaymentMethod('PIX')}
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
            >
              Comprar
            </Button>
          </div>
        </div>
      </main>
    </>
  )
}
