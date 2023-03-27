import { CaretRight } from 'phosphor-react'
import { Banner } from './subcomponents/Banner'
import { Department } from './subcomponents/Department'

export function Main() {
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
        <Department name="Desenvolvedor" />
        <Department name="Desenvolvedor" />
      </div>
    </main>
  )
}
