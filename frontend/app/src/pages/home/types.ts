import { DepartmentModel } from '@/code/models/products'

export interface IProductData {
  id: string
  name: string
  image: string
  description: string
  rating: number
  price: {
    onSale: boolean
    currentValue: number
    value: number
    promotional_value: number | null
    discount: number
  }
  provider: {
    id: string
    name: string
  }
  department: DepartmentModel
}
