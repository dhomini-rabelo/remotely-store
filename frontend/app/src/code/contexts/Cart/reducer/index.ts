import { ICart } from '../types'
import { CartActions } from './actions'
import { CartReducerAction } from './types'

export function CartReducer(state: ICart, action: CartReducerAction): ICart {
  switch (action.type) {
    case CartActions.ADD_PRODUCT:
      return {
        products: [...state.products, action.payload.product],
      }
  }
}
