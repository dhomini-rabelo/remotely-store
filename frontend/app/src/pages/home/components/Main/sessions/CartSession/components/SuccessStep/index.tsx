import { Button } from '@/layout/components/Button'
import SuccessImage from '@/assets/images/success.svg'
import Image from 'next/image'

export function SuccessStep() {
  return (
    <main id="cart-container" className="relative bg-white flex flex-col grow">
      <h2 className="text-xl font-bold inter lh-29 mt-4 sm:mt-10 text-center w-full block">
        Compra Efetuada!
      </h2>
      <div className="flex flex-col items-center justify-center grow sm:mb-40 tsm:mt-6">
        <Image
          src={SuccessImage}
          width={382}
          height={282}
          alt="Imagem de uma caixa de papelão com fundo de circulo bem colorida"
        />
      </div>
      <div className="block sm:hidden w-full pt-10 pb-4 bg-white">
        <div className="flex flex-col gap-y-2">
          <Button
            className="custom-length py-3 w-full text-sm font-medium lh-22"
            variant="primary"
          >
            Ver pedidos
          </Button>
        </div>
      </div>
      <div className="hidden sm:block fixed bottom-0 left-0 w-full py-10 px-6 bg-white">
        <div className="flex flex-col gap-y-8">
          <Button
            className="custom-length py-5 w-full text-base font-medium lh-22"
            variant="primary"
          >
            Ver pedidos
          </Button>
        </div>
      </div>
    </main>
  )
}
