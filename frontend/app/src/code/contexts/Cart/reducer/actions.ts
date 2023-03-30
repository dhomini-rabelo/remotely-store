import { IProductCart } from '../types'
import { CartReducerAction } from './types'

/* eslint-disable */
export enum CartActions {
  ADD_PRODUCT = 'ADD_PRODUCT',
}
/* eslint-enable */

export const CartConsumer = {
  addProduct(product: IProductCart): CartReducerAction {
    return {
      type: CartActions.ADD_PRODUCT,
      payload: {
        product,
      },
    }
  },
}
