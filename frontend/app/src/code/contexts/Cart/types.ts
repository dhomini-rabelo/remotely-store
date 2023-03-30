export interface ICart {
  products: {
    id: string
    quantity: number
  }[]
}

export interface CartContextType extends ICart {
  actions: {}
}
