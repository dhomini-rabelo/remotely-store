import { activeProductAtom } from '@/pages/home/code/states'
import { useAtom } from 'jotai'
import { getImage } from '@/code/utils/layout'
import Image from 'next/image'
import StarIcon from '../../../../../../assets/icons/star.svg'
import { priceFormatter } from '@/code/utils/layout/formatters'

export function ProductDetail() {
  const [activeProduct] = useAtom(activeProductAtom)
  return (
    <main id="product-container" className="flex flex-col grow w-full h-full">
      <div className="flex justify-center items-center w-full min-h-[86px] py-4">
        <Image
          src={getImage(activeProduct!.image)}
          width={372}
          height={440}
          alt={activeProduct!.description}
        />
      </div>
      <div className="bg-white grow py-6 px-5">
        <div className="flex justify-between items-start">
          <div className="flex flex-col bg-white p-2 truncate">
            <h2 className="text-1xl font-bold lh-29">{activeProduct!.name}</h2>
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
      </div>
    </main>
  )
}
