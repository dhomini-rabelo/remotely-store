export interface IProductCart {
  id: string
  quantity: number
}

export interface ICart {
  products: IProductCart[]
}

export interface CartContextType extends ICart {
  actions: {
    addProduct: (product: IProductCart) => void
  }
}
