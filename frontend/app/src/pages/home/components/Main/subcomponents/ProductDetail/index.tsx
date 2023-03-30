import { activeProductAtom, currentPageAtom } from '@/pages/home/code/states'
import { useAtom } from 'jotai'
import { getImage } from '@/code/utils/layout'
import Image from 'next/image'
import StarIcon from '../../../../../../assets/icons/star.svg'
import { priceFormatter } from '@/code/utils/layout/formatters'
import { IProductData } from '@/pages/home/types'
import { Product } from '../Product'
import { CaretLeft, CaretRight, Heart } from 'phosphor-react'
import { Button } from '@/layout/components/Button'
import { SimpleModal } from '@/layout/components/Modals/Simple'

export function ProductDetail({ products }: { products: IProductData[] }) {
  const [, setPage] = useAtom(currentPageAtom)
  const [activeProduct] = useAtom(activeProductAtom)
  const backToHome = () => setPage('home')

  return (
    <main
      id="product-container"
      className="flex sm:flex-col sm:grow w-full h-full pb-24"
    >
      <SimpleModal title="Escolha a quantidade" controlIsOpen={true}>
        <div className="mt-2">
          <div className="flex justify-around items-center py-6 px-8">
            <span>
              <CaretLeft size={24} />
            </span>
            <strong className="text-4xl">1</strong>
            <span>
              <CaretRight size={24} />
            </span>
          </div>
          <Button
            className="w-full custom-length py-4 font-medium lh-22 text-lg"
            variant="primary"
          >
            Confirmar
          </Button>
        </div>
      </SimpleModal>
      <div className="flex justify-center items-center w-full min-h-[86px] py-4 relative">
        <Image
          src={getImage(activeProduct!.image)}
          width={300}
          height={375}
          alt={activeProduct!.description}
        />
        <CaretLeft
          size={28}
          className="absolute top-0 left-6"
          onClick={backToHome}
        />
      </div>
      <div className="bg-white py-6 px-5 tmd:min-w-[400px]">
        <div className="flex justify-between items-start gap-x-6 esm:gap-x-3">
          <div className="flex flex-col bg-white">
            <h2 className="text-1xl font-bold lh-29 truncate whitespace-normal">
              {activeProduct!.name}
            </h2>
            <div className="mt-1 mb-3 text-xs flex gap-x-2">
              <span className="text-Gray-500 font-medium">
                {activeProduct!.provider.name}
              </span>
              <span>•</span>
              <span className="flex items-center gap-x-0.5 text-xs">
                <span className="text-Gray-600">
                  {activeProduct!.rating.toFixed(1).replace('.', ',')}
                </span>
                <Image
                  src={StarIcon}
                  width={12}
                  height={12}
                  alt="Ícone de estrela amarela"
                  className="inline-block relative bottom-[1px]"
                />
              </span>
            </div>
          </div>
          <div className="bg-Gray-150 py-[0.9375rem] px-[0.625rem] flex flex-col rounded-lg gap-y-0.5">
            <strong className="font-bold text-1xl">
              {priceFormatter.format(activeProduct!.price.value)}
            </strong>
            <span className="text-xs text-center text-Orange-500">7% off</span>
          </div>
        </div>
        <p className="mt-4 lh-22 mb-8">{activeProduct!.description}</p>
        <h2 className="text-1xl font-bold">Relacionados</h2>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-x-5 sm:flex-col mt-3 gap-y-3">
          {products
            .filter(
              (product) =>
                product.department.id === activeProduct!.department.id &&
                product.id !== activeProduct!.id,
            )
            .map((product) => (
              <Product key={product.id} product={product} variant="secondary" />
            ))}
        </div>
        <div className="sm:hidden block pb-0 pt-8 px-0 bg-white">
          <div className="flex gap-x-8 items-center justify-end">
            <Button
              className="custom-length py-5 w-full text-base font-medium lh-22"
              variant="primary"
            >
              Comprar
            </Button>
            <Heart size={32} />
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 w-full hidden sm:block pb-5 pt-3 px-6 bg-white">
        <div className="flex gap-x-8 items-center">
          <Button
            className="w-full custom-length py-5 text-base font-medium lh-22"
            variant="primary"
          >
            Comprar
          </Button>
          <Heart size={32} />
        </div>
      </div>
    </main>
  )
}
