import { DepartmentModel } from '@/code/models/products'
import { Header } from './components/Header'
import { Main } from './components/Main'
import { Bag } from './components/Main/subcomponents/Bag'
import { IProductData } from './types'

export interface HomeProps {
  departments: DepartmentModel[]
  products: IProductData[]
}

export function Home(props: HomeProps) {
  return (
    <div className="px-6 mt-8 grow max-w-[1148px] mx-auto pb-8">
      <Header />
      <div className="max-w-[1024px] mx-auto">
        <Main {...props} />
        <Bag inHeader={false} />
      </div>
    </div>
  )
}
