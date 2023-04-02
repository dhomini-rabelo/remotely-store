import { IProductCart } from '../types'
import { CartReducerAction } from './types'

/* eslint-disable */
export enum CartActions {
  ADD_PRODUCT = 'ADD_PRODUCT',
  REMOVE_PRODUCT = 'REMOVE_PRODUCT',
  UPDATE_PRODUCT_QUANTITY = 'UPDATE_PRODUCT_QUANTITY',
  CLEAR_CART = 'CLEAR_CART',
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
  removeProduct(productId: string): CartReducerAction {
    return {
      type: CartActions.REMOVE_PRODUCT,
      payload: {
        productId,
      },
    }
  },
  updateProductQuantity(product: IProductCart): CartReducerAction {
    return {
      type: CartActions.UPDATE_PRODUCT_QUANTITY,
      payload: {
        product,
      },
    }
  },
  clearCart(): CartReducerAction {
    return {
      type: CartActions.CLEAR_CART,
      payload: null,
    }
  },
}
