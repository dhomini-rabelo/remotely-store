export interface IProductData {
  id: string
  name: string
  image: string
  description: string
  rating: number
  price: {
    value: number
    promotional_value: number | null
  }
  provider: {
    id: string
    name: string
  }
}
