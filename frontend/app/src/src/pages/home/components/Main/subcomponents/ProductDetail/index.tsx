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
import { useState } from 'react'
import { useContextSelector } from 'use-context-selector'
import { CartContext } from '@/code/contexts/Cart'

export function ProductDetail({
  products,
  productsForBuy,
}: {
  products: IProductData[]
  productsForBuy: IProductData[]
}) {
  const addProductToCart = useContextSelector(
    CartContext,
    (state) => state.actions.addProduct,
  )
  const [, setPage] = useAtom(currentPageAtom)
  const [activeProduct] = useAtom(activeProductAtom)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [productQuantity, setProductQuantity] = useState(1)
  const productQuantityState = {
    add() {
      setProductQuantity((quantity) => quantity + 1)
    },
    remove() {
      if (productQuantity > 1) {
        setProductQuantity((quantity) => quantity - 1)
      }
    },
  }
  const modalIsOpenState = {
    open: () => setModalIsOpen(true),
    close: () => setModalIsOpen(false),
  }
  const backToHome = () => setPage('home')

  function confirmAddProductToCart() {
    addProductToCart({
      id: activeProduct!.id,
      quantity: productQuantity,
    })
    setModalIsOpen(false)
    backToHome()
  }

  return (
    <>
      <SimpleModal
        title="Escolha a quantidade"
        controlIsOpen={modalIsOpen}
        onClose={modalIsOpenState.close}
      >
        <div className="mt-2">
          <div className="flex justify-around items-center py-6 px-8">
            <span>
              <CaretLeft
                size={24}
                onClick={productQuantityState.remove}
                className="cursor-pointer"
              />
            </span>
            <strong className="text-4xl">{productQuantity}</strong>
            <span>
              <CaretRight
                size={24}
                onClick={productQuantityState.add}
                className="cursor-pointer"
              />
            </span>
          </div>
          <Button
            className="w-full custom-length py-4 font-medium lh-22 text-lg"
            variant="primary"
            onClick={confirmAddProductToCart}
          >
            Confirmar
          </Button>
        </div>
      </SimpleModal>
      <main
        id="product-container"
        className="flex sm:flex-col sm:grow w-full h-full pb-24"
      >
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
                {priceFormatter.format(activeProduct!.price.currentValue)}
              </strong>
              <span className="text-xs text-center text-Orange-500">
                7% off
              </span>
            </div>
          </div>
          <p className="mt-4 lh-22 mb-8">{activeProduct!.description}</p>
          <h2 className="text-1xl font-bold">Relacionados</h2>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-x-5 sm:flex-col mt-3 gap-y-3">
            {productsForBuy
              .filter(
                (product) =>
                  product.department.id === activeProduct!.department.id &&
                  product.id !== activeProduct!.id,
              )
              .map((product) => (
                <Product
                  key={product.id}
                  product={product}
                  variant="secondary"
                />
              ))}
          </div>
          <div className="sm:hidden block pb-0 pt-8 px-0 bg-white">
            <div className="flex gap-x-8 items-center justify-end">
              <Button
                className="custom-length py-5 w-full text-base font-medium lh-22"
                variant="primary"
                onClick={modalIsOpenState.open}
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
              onClick={modalIsOpenState.open}
            >
              Comprar
            </Button>
            <Heart size={32} />
          </div>
        </div>
      </main>
    </>
  )
}