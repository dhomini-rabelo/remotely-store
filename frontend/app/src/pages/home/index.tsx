import { DepartmentModel } from '@/code/models/products'
import { Tote } from 'phosphor-react'
import { Header } from './components/Header'
import { Main } from './components/Main'
import { IProductData } from './types'

export interface HomeProps {
  departments: DepartmentModel[]
  products: IProductData[]
}

export function Home(props: HomeProps) {
  return (
    <div className="px-6 mt-8 grow">
      <Header />
      <Main {...props} />
      <div className="fixed right-4 bottom-4">
        <div className="bg-Black-500 w-[3.8rem] h-[3.8rem] rounded-full flex justify-center items-center">
          <Tote height={32} width={28} color="#fff" />
        </div>
        <div className="absolute bg-[#FF7B2C] py-1 px-[0.54rem] -right-1 -top-1 rounded-full text-white text-xs">
          1
        </div>
      </div>
    </div>
  )
}
