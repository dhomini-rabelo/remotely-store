import { Button } from '@/layout/components/Button'
import Image from 'next/image'
import StarIcon from '../../../../../../assets/icons/star.svg'
import { IProductData } from '@/pages/home/types'
import { priceFormatter } from '@/code/utils/layout/formatters'
import { getImage } from '@/code/utils/layout'
import { useAtom } from 'jotai'
import { activeProductAtom, currentPageAtom } from '@/pages/home/code/states'

export function Banner({
  product,
  index,
}: {
  product: IProductData
  index: number
}) {
  const [, setPage] = useAtom(currentPageAtom)
  const [, setActiveProduct] = useAtom(activeProductAtom)

  function handleMoveToProductPage() {
    setPage('product')
    setActiveProduct(product)
  }

  const width = [110, 129][index] || 100
  const height = [256, 246][index] || 150
  return (
    <div className="bg-Black-500 rounded-[32px] flex text-white relative mt-1 px-6 mx-auto tmd:max-w-[400px]">
      <div className="flex flex-col grow my-6 tmd:text-1xl tsm:text-xl">
        <strong>
          {product.name}
          <br />
          <>&nbsp;</>
        </strong>
        <div className="mt-2 mb-5 tmd:text-base tsm:text-sm text-xs flex gap-x-2">
          <span className="text-Gray-500 font-medium">
            {product.provider.name}
          </span>
          <span>•</span>
          <span className="flex items-center gap-x-0.5">
            <span className="text-Gray-300">
              {product.rating.toFixed(1).replace('.', ',')}
            </span>
            <Image
              src={StarIcon}
              width={12}
              height={12}
              alt="Ícone de estrela amarela"
              className="inline-block relative bottom-[1px]"
              priority
            />
          </span>
        </div>
        <div className="flex gap-x-1">
          <Button
            className="custom-length py-2.5 px-3 text-base"
            variant="primary"
            onClick={handleMoveToProductPage}
          >
            {priceFormatter.format(product.price.currentValue)}
          </Button>
          <strong className="rounded-full bg-red-500 text-white p-2 text-sm flex flex-col justify-center">
            {product.price.discount}%
          </strong>
        </div>
      </div>
      {/* eslint-disable */}
      <Image
        src={getImage(product.image)}
        width={width}
        height={height}
        alt={product.description}
        className={`absolute right-6 -top-8`}
      />
    </div>
  )
}
