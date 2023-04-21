import { CaretLeft, CaretRight } from 'phosphor-react'
import { Banner } from '../Banner'
import { Product } from '../Product'
import { Department } from '../Department'
import { MainProps } from '../..'
import { useEffect, useState } from 'react'
import { DepartmentModel } from '@/code/models/products'
import Image from 'next/image'
import BagIcon from '@/assets/icons/bag.svg'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { Div } from './styles'

export function DefaultMain({
  departments,
  productsForBuy,
  products,
  banner,
}: MainProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [activeDepartment, setActiveDepartment] =
    useState<null | DepartmentModel>(null)

  function handleShowProductsFromDepartment(department: DepartmentModel) {
    setActiveDepartment(department)
  }

  function handleShowAllProducts() {
    setActiveDepartment(null)
  }

  const [departmentRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: 'free',
    slides: {
      perView: 'auto',
      spacing: 16,
    },
    dragSpeed: 0.3,
  })

  const [sliderRef, instanceRef] = useKeenSlider({
    breakpoints: {
      '(min-width: 640px)': {
        slides: { perView: 2, spacing: 24 },
      },
    },
    slides: { perView: 1, spacing: 24 },
    loop: true,
    created() {
      setLoaded(true)
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
  })

  useEffect(() => {
    instanceRef.current?.update({
      breakpoints: {
        '(min-width: 640px)': {
          slides: { perView: 2, spacing: 24 },
        },
      },
      slides: { perView: 1, spacing: 24 },
      loop: true,
      created() {
        setLoaded(true)
      },
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel)
      },
    })
  }, [instanceRef])

  if (!activeDepartment) {
    return (
      <main className="mt-10">
        <h2 className="text-1xl font-bold">Em destaque</h2>
        <Div.bannerSlider className="keen-slider" ref={sliderRef}>
          {products
            .filter((product) => banner.includes(product.id))
            .map((product, index) => (
              <Div.bannerSlideItem
                className={`keen-slider__slide ${!sliderRef && 'd-none'}`}
                key={product.id}
              >
                <Banner product={product} index={index} />
              </Div.bannerSlideItem>
            ))}
        </Div.bannerSlider>
        {loaded && instanceRef.current && (
          <Div.dots>
            {[
              ...Array.from({
                length: instanceRef.current!.track!.details!.slides!
                  .length! as number,
              }).map((_, i) => i),
            ].map((idx) => {
              return (
                <button
                  key={idx}
                  onClick={() => {
                    instanceRef.current?.moveToIdx(idx)
                  }}
                  className={'dot' + (currentSlide === idx ? ' active' : '')}
                ></button>
              )
            })}
          </Div.dots>
        )}
        <div className="flex justify-between items-center mt-8">
          <h2 className="text-1xl font-bold">Departamentos</h2>
          <div className="text-Gray-500 flex items-center gap-x-2">
            <span className="text-xs">Ver mais</span>
            <CaretRight size={16} />
          </div>
        </div>
        <div className="keen-slider mt-3" ref={departmentRef}>
          {/* eslint-disable */}
          {departments.map((department) => (
            <Div.departmentSlideItem
              key={department.id}
              onClick={() => handleShowProductsFromDepartment(department)}
              className={`cursor-pointer keen-slider__slide w-[136px] h-[178px] ${!sliderRef && 'd-none'}`}
            >
              <Department name={department.name} imageUrl={department.image} />
            </Div.departmentSlideItem>
          ))}
        </div>
        <div className="flex justify-between items-center mt-8">
          <h2 className="text-1xl font-bold">Em alta</h2>
          <div className="text-Gray-500 flex items-center gap-x-2">
            <span className="text-xs">Ver mais</span>
            <CaretRight size={16} />
          </div>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-2 gap-x-5 sm:flex sm:flex-col mt-3 gap-y-3">
          {productsForBuy.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </main>
    )
  } else {
    return (
      <main className="mt-10">
        <div className="flex justify-between items-center mt-2 relative">
          <div
            onClick={handleShowAllProducts}
            className="tsm:hidden absolute left-2"
          >
            <CaretLeft size={28} />
          </div>
          <h2 className="text-1xl font-bold sm:grow sm:text-center">
            {activeDepartment.name}
          </h2>
          <div
            className="flex items-center gap-x-2 cursor-pointer border-b-2 border-Gray-600 pb-0.5 sm:hidden"
            onClick={handleShowAllProducts}
          >
            <Image
              src={BagIcon}
              width={28}
              height={28}
              alt="ícone de cesta de compras"
            />
            <span className="text-lg">Ver todos</span>
          </div>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-2 gap-x-5 sm:flex sm:flex-col mt-5 gap-y-3">
          {productsForBuy
            .filter((product) => product.department.id === activeDepartment.id)
            .map((product) => (
              <Product key={product.id} product={product} />
            ))}
        </div>
      </main>
    )
  }
}
