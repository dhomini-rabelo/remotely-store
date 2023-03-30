import { ICart } from '../types'
// import { CartActions } from './actions'
import { CartReducerAction } from './types'

export function CartReducer(state: ICart, action: CartReducerAction): ICart {
  // switch (action.type) {
  //   case CartActions.LOGIN:
  // }
  return { ...state }
}
