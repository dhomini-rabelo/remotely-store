import { DepartmentModel } from '@/code/models/products'
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
    </div>
  )
}
