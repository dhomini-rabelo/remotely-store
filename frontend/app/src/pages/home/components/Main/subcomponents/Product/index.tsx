import Image from 'next/image'
import StarIcon from '../../../../../../assets/icons/star.svg'
import { IProductData } from '@/pages/home/types'
import { getImage } from '@/layout/utils'
import { priceFormatter } from '@/layout/utils/formatters'
import { activeProductAtom, currentPageAtom } from '@/pages/home/code/states'
import { useAtom } from 'jotai'
import { ArrowDown } from 'phosphor-react'
import 'keen-slider/keen-slider.min.css'
import { memo } from 'react'

function ProductComponent({
  product,
  variant = 'primary',
}: {
  product: IProductData
  variant?: 'primary' | 'secondary'
}) {
  const [page, setPage] = useAtom(currentPageAtom)
  const [, setActiveProduct] = useAtom(activeProductAtom)

  function showProductPage() {
    if (page !== 'product') {
      setPage('product')
    }
    setActiveProduct(product)
  }

  return variant === 'primary' ? (
    <div
      onClick={showProductPage}
      className="bg-white p-3 flex gap-x-2.5 border border-Gray-300 rounded-lg col-span-1 cursor-pointer relative"
    >
      <div className="flex justify-center items-center bg-Gray-200 p-2.5 w-[105px] h-[86px]">
        <Image
          src={getImage(product.image)}
          width={64}
          height={64}
          alt={product.description}
          className="max-w-16 max-h-16 object-contain block"
        />
      </div>
      <div className="flex flex-col ">
        <strong className="leading-[22px] text-base font-medium">
          {product.name}
        </strong>
        <div className="mt-1 mb-3 text-xs flex gap-x-2">
          <span className="text-Gray-500 font-medium truncate">
            {product.provider.name}
          </span>
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
          {priceFormatter.format(product.price.currentValue)}
        </strong>
        {product.price.onSale && (
          <strong className="text-Orange-500 flex items-center absolute right-2 bottom-2">
            <ArrowDown size={20} /> {product.price.discount}%
          </strong>
        )}
      </div>
    </div>
  ) : (
    <div
      onClick={showProductPage}
      className="bg-Gray-250 p-3 flex flex-col gap-x-2.5 border border-Gray-300 rounded-lg col-span-1 cursor-pointer"
    >
      <div className="flex justify-center items-center bg-transparent p-2.5 min-w-[105px] min-h-[86px]">
        <Image
          src={getImage(product.image)}
          width={64}
          height={64}
          alt={product.description}
          className="max-w-16 max-h-16 object-contain block"
        />
      </div>
      <div className="flex flex-col bg-white p-2 relative">
        <strong className="leading-[22px] text-base font-medium truncate">
          {product.name}
        </strong>
        <div className="mt-1 mb-3 text-xs flex gap-x-2">
          <span className="text-Gray-500 font-medium truncate">
            {product.provider.name}
          </span>
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
          {priceFormatter.format(product.price.currentValue)}
        </strong>
        {product.price.onSale && (
          <strong className="text-Orange-500 flex items-center absolute right-2 bottom-2 text-xs">
            <ArrowDown size={16} /> {product.price.discount}%
          </strong>
        )}
      </div>
    </div>
  )
}

export const Product = memo(
  ProductComponent,
  (oldProps, newProps) =>
    oldProps.product.id === newProps.product.id &&
    oldProps.variant === newProps.variant,
)
