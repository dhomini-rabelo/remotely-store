import { activeProductAtom, currentPageAtom } from '@/pages/home/code/states'
import { useAtom } from 'jotai'
import { getImage } from '@/code/utils/layout'
import Image from 'next/image'
import StarIcon from '../../../../../../assets/icons/star.svg'
import { priceFormatter } from '@/code/utils/layout/formatters'
import { IProductData } from '@/pages/home/types'
import { Product } from '../Product'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { Button } from '@/layout/components/Button'
import { SimpleModal } from '@/layout/components/Modals/Simple'
import { useEffect, useState } from 'react'
import { useContextSelector } from 'use-context-selector'
import { CartContext } from '@/code/contexts/Cart'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { Div } from './styles'

export function ProductDetail({
  productsForBuy,
}: {
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [activeProduct?.id])

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

  function handleAddProductToCart() {
    addProductToCart({
      id: activeProduct!.id,
      quantity: productQuantity,
    })
    setModalIsOpen(false)
    backToHome()
  }

  const [relatedProductsSliderRef, relatedProductsInstanceSliderRef] =
    useKeenSlider<HTMLDivElement>({
      loop: true,
      mode: 'free',
      slides: {
        perView: 'auto',
        spacing: 16,
      },
      dragSpeed: 0.3,
    })

  const relatedProducts = productsForBuy.filter(
    (product) =>
      product.department.id === activeProduct!.department.id &&
      product.id !== activeProduct!.id,
  )

  useEffect(() => {
    relatedProductsInstanceSliderRef.current?.update({
      loop: true,
      mode: 'free',
      slides: {
        perView: 'auto',
        spacing: 16,
      },
      dragSpeed: 0.3,
    })
  }, [activeProduct, relatedProductsInstanceSliderRef])

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
            className="w-full custom-length py-4 font-medium leading-[22px] text-lg"
            variant="primary"
            onClick={handleAddProductToCart}
          >
            Confirmar
          </Button>
        </div>
      </SimpleModal>
      <main
        id="product-container"
        className="flex md:flex-col sm:grow w-full h-full pb-24"
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
            className="absolute top-0 left-6 cursor-pointer"
            onClick={backToHome}
          />
        </div>
        <div className="tsm:flex tsm:flex-col tsm:py-6 tsm:px-5 tmd:min-w-[400px] bg-white">
          <div className="sm:py-6 sm:px-5">
            <div className="flex justify-between items-start gap-x-6 esm:gap-x-3">
              <div className="flex flex-col bg-white">
                <h2 className="text-1xl font-bold leading-[29px] truncate whitespace-normal">
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
                  {activeProduct!.price.discount ? (
                    `${activeProduct!.price.discount}% off`
                  ) : (
                    <>&nbsp;</>
                  )}
                </span>
              </div>
            </div>
            <p className="mt-4 leading-[22px] mb-8">
              {activeProduct!.description}
            </p>
            <h2 className="text-1xl font-bold">Relacionados</h2>
            <div
              className="mt-3 keen-slider max-w-full"
              ref={relatedProductsSliderRef}
            >
              {relatedProducts.map((product) => (
                <Div.productSlideItem
                  className="keen-slider__slide"
                  key={product.id}
                >
                  <Product product={product} variant="secondary" />
                </Div.productSlideItem>
              ))}
            </div>
          </div>
          <div className="tsm:pb-0 tsm:pt-8 tsm:px-0 sm:fixed sm:bottom-0 w-full sm:pb-5 sm:pt-3 sm:px-6 bg-white">
            <Button
              className="custom-length py-5 w-full text-base font-medium leading-[22px]"
              variant="primary"
              onClick={modalIsOpenState.open}
            >
              Comprar
            </Button>
          </div>
        </div>
      </main>
    </>
  )
}
