import { getImage } from '@/layout/utils'
import { priceFormatter } from '@/layout/utils/formatters'
import Image from 'next/image'
import { MinusCircle, PlusCircle, Trash } from 'phosphor-react'
import { useContextSelector } from 'use-context-selector'
import { CartContext } from '@/code/contexts/Cart'
import { IProductCartData } from '../../..'

export function ProductCart({ product }: { product: IProductCartData }) {
  const { removeProductCart, updateProductCart } = useContextSelector(
    CartContext,
    (state) => ({
      removeProductCart: state.actions.removeProduct,
      updateProductCart: state.actions.updateProductQuantity,
    }),
  )
  const productQuantityActions = {
    add() {
      updateProductCart({
        id: product.id,
        quantity: product.quantity + 1,
      })
    },
    remove() {
      if (product.quantity > 1) {
        updateProductCart({
          id: product.id,
          quantity: product.quantity - 1,
        })
      }
    },
  }

  return (
    <div className="bg-Gray-150 p-3 flex gap-x-4 rounded-lg col-span-1 relative">
      <div className="flex justify-center items-center bg-white p-2.5 min-w-[105px] min-h-[86px] rounded-lg">
        <Image
          src={getImage(product.image)}
          width={64}
          height={64}
          alt={product.description}
          className="max-w-16 max-h-16 object-contain block"
        />
      </div>
      <div className="flex flex-col">
        <strong className="leading-[22px] text-base font-medium">
          {product.name}
        </strong>
        <strong className="text-Orange-500 mt-1 text-sm">
          {priceFormatter.format(product.price.currentValue)}
        </strong>
        <div className="grow flex flex-col justify-end">
          <div className="flex items-center text-base text-Gray-500 gap-x-2">
            <span>
              <MinusCircle
                size={20}
                onClick={productQuantityActions.remove}
                className="cursor-pointer"
              />
            </span>
            <strong className="text-Gray-500 text-lg">
              {product.quantity}
            </strong>
            <span>
              <PlusCircle
                size={20}
                onClick={productQuantityActions.add}
                className="cursor-pointer"
              />
            </span>
          </div>
        </div>
      </div>
      <div>
        <Trash
          onClick={() => removeProductCart(product.id)}
          size={20}
          className="absolute bottom-2 right-2 text-Orange-500 cursor-pointer"
        />
      </div>
    </div>
  )
}
