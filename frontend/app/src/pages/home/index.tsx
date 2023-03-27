import { DepartmentModel } from '@/code/models/products'
import { Header } from './components/Header'
import { Main } from './components/Main'

export interface HomeProps {
  departments: DepartmentModel[]
}

export function Home(props: HomeProps) {
  return (
    <div className="px-6 mt-8 grow">
      <Header />
      <Main {...props} />
    </div>
  )
}
