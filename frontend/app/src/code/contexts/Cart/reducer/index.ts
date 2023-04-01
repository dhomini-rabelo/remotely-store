import { ICart } from '../types'
import { CartActions } from './actions'
import { CartReducerAction } from './types'

export function CartReducer(state: ICart, action: CartReducerAction): ICart {
  console.log(action)
  switch (action.type) {
    case CartActions.ADD_PRODUCT:
      return {
        products: [...state.products, action.payload.product],
      }
    case CartActions.REMOVE_PRODUCT:
      return {
        products: state.products.filter(
          (product) => product.id !== action.payload.productId,
        ),
      }
    case CartActions.UPDATE_PRODUCT_QUANTITY:
      return {
        products: state.products.map((product) =>
          product.id !== action.payload.product.id
            ? product
            : action.payload.product,
        ),
      }
  }
}
