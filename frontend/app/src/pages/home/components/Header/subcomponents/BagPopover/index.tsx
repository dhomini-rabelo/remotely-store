import { Popover, Transition } from '@headlessui/react'
import { Cart } from '../../../Main/subcomponents/Cart'
import { Fragment } from 'react'
import { IProductData } from '@/pages/home/types'
import { Bag } from '../../../Main/subcomponents/Bag'
import { useAtom } from 'jotai'
import { cartPageAtom } from '@/pages/home/code/states'
import { Checkout } from '../../../Main/subcomponents/Checkout'

export function BagPopover({ products }: { products: IProductData[] }) {
  const [cartPage] = useAtom(cartPageAtom)
  return (
    <Popover className="relative">
      {({ open }: { open: boolean }) => (
        <>
          <Popover.Button as="span" className={open ? '' : 'cursor-pointer'}>
            <Bag inHeader={true} />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-1 mt-4 min-w-[400px] border rounded-lg border-Gray-600 z-20 bg-white">
              <div className="px-4">
                {cartPage === 'cart' && <Cart products={products} />}
                {cartPage === 'checkout' && <Checkout products={products} />}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
