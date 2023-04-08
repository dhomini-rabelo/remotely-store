import { Button } from '@/layout/components/Button'
import SuccessImage from '@/assets/images/success.svg'
import Image from 'next/image'
import { useAtom } from 'jotai'
import { currentPageAtom } from '@/pages/home/code/states'
import { CaretLeft } from 'phosphor-react'
import Link from 'next/link'

export function SuccessStep() {
  const [, setPage] = useAtom(currentPageAtom)
  const backToHome = () => setPage('home')
  return (
    <main id="cart-container" className="relative bg-white flex flex-col grow">
      <CaretLeft
        size={28}
        className="absolute top-0 left-0 sm:block hidden"
        onClick={backToHome}
      />
      <h2 className="text-xl font-bold inter leading-[29px] mt-4 sm:mt-10 text-center w-full block">
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
      <div className="block tsm:pt-10 tsm:pb-4 sm:fixed sm:bottom-0 sm:left-0 w-full sm:py-10 sm:px-6 bg-white">
        <Link href="/minha-conta" className="flex flex-col gap-y-2">
          <Button
            className="custom-length py-3 sm:py-5 w-full text-sm sm:text-base font-medium leading-[22px]"
            variant="primary"
          >
            Ver pedidos
          </Button>
        </Link>
      </div>
    </main>
  )
}
