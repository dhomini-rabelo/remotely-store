import Image from 'next/image'
import StarIcon from '../../../../../../assets/icons/star.svg'
import { IProductData } from '@/pages/home/types'
import { getImage } from '@/code/utils/layout'
import { priceFormatter } from '@/code/utils/layout/formatters'

export function Product({ product }: { product: IProductData }) {
  return (
    <div className="bg-white p-3 flex gap-x-2.5 border border-Gray-300 rounded-lg">
      <div className="flex justify-center items-center bg-Gray-200 p-2.5 min-w-[105px] min-h-[86px]">
        <Image
          src={getImage(product.image)}
          width={60}
          height={60}
          alt={product.description}
        />
      </div>
      <div className="flex flex-col">
        <strong className="lh-22 text-base font-medium">{product.name}</strong>
        <div className="mt-1 mb-3 text-xs flex gap-x-2">
          <span className="text-Gray-500 font-medium">Hughlan</span>
          <span>•</span>
          <span className="flex items-center gap-x-0.5 text-xs">
            <span className="text-Gray-600">
              {product.rating.toFixed(1).replace('.', ',')}
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
        <strong className="text-Orange-500">
          {priceFormatter.format(product.price.value)}
        </strong>
      </div>
    </div>
  )
}
