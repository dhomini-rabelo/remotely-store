import { Button } from '@/layout/components/Button'
import { currentPageAtom } from '@/pages/home/code/states'
import { useAtom } from 'jotai'
import Link from 'next/link'
import { CaretLeft } from 'phosphor-react'

export function LoginStep() {
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
        Você precisa estar logado para continuar
      </h2>

      <div className="block sm:hidden w-full pt-10 pb-4 bg-white">
        <Link href="/login" className="flex flex-col gap-y-2">
          <Button
            className="custom-length py-3 w-full text-sm font-medium leading-[22px]"
            variant="primary"
          >
            Fazer login
          </Button>
        </Link>
      </div>
    </main>
  )
}
