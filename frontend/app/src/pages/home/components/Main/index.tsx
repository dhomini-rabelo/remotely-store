import { useAtom } from 'jotai'
import { CaretRight } from 'phosphor-react'
import { HomeProps } from '../..'
import { currentPageAtom, searchTextAtom } from '../../code/states'
import { Banner } from './subcomponents/Banner'
import { Department } from './subcomponents/Department'
import { Product } from './subcomponents/Product'

export function Main({ departments, products }: HomeProps) {
  const [page] = useAtom(currentPageAtom)
  const [search] = useAtom(searchTextAtom)

  return page === 'home' || search === '' ? (
    <main className="mt-10">
      <h2 className="text-1xl font-bold">Em destaque</h2>
      <div className="grid grid-cols-2 gap-x-8 md:block">
        <div className="col-span-1">
          <Banner />
        </div>
        <div className="col-span-1 md:hidden">
          <Banner />
        </div>
      </div>
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
      {/* <div className="flex justify-between items-center mt-8">
        <h2 className="text-1xl font-bold">Em alta 2</h2>
        <div className="text-Gray-500 flex items-center gap-x-2">
          <span className="text-xs">Ver mais</span>
          <CaretRight size={16} />
        </div>
      </div>
      <div className="grid grid-cols-5 md:grid-cols-2 gap-x-5 sm:flex-col mt-3 gap-y-3">
        {products.map((product) => (
          <Product key={product.id} product={product} variant="secondary" />
        ))}
      </div> */}
    </main>
  ) : (
    <main className="mt-10">
      <h2 className="text-1xl font-bold"> Resultados para {`"${search}"`}</h2>
      <div className="grid grid-cols-3 md:grid-cols-2 gap-x-5 sm:flex sm:flex-col mt-3 gap-y-3">
        {products
          .filter((product) =>
            `
              ${product.name.toLowerCase()}
              ${product.provider.name.toLowerCase()}
            `.includes(search.toLowerCase()),
          )
          .map((product) => (
            <Product key={product.id} product={product} />
          ))}
      </div>
    </main>
  )
}
