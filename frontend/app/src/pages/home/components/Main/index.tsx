import { CaretRight } from 'phosphor-react'
import { HomeProps } from '../..'
import { Banner } from './subcomponents/Banner'
import { Department } from './subcomponents/Department'
import { Product } from './subcomponents/Product'

export function Main({ departments, products }: HomeProps) {
  return (
    <main>
      <h2 className="text-1xl font-bold mt-10">Em destaque</h2>
      <Banner />
      <div className="flex justify-between items-center mt-8">
        <h2 className="text-1xl font-bold">Departamentos</h2>
        <div className="text-Gray-500 flex items-center gap-x-2">
          <span className="text-xs">Ver mais</span>
          <CaretRight size={16} />
        </div>
      </div>
      <div className="flex mt-3 gap-x-5">
        {departments.map((department) => (
          <Department
            key={department.id}
            name={department.name}
            imageUrl={department.image}
          />
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
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </main>
  )
}
