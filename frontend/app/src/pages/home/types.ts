import { DepartmentModel } from '@/code/models/products'

export interface IProductData {
  id: string
  name: string
  image: string
  description: string
  rating: number
  price: {
    currentValue: number
    value: number
    promotional_value: number | null
  }
  provider: {
    id: string
    name: string
  }
  department: DepartmentModel
}
