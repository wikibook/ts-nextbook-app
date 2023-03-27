import { Product } from 'types'

export const ADD_PRODUCT = 'ADD_PRODUCT'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

type ShopReducerAction =
  | {
      type: 'ADD_PRODUCT'
      payload: Product
    }
  | {
      type: 'REMOVE_PRODUCT'
      payload: number
    }

/**
 * 상품 추가 액션
 * @param product 상품
 * @param state 현재 상태
 * @returns 다음 상태
 */
const addProductToCart = (product: Product, state: Product[]) => {
  return [...state, product]
}

/**
 * 상품 삭제 액션
 * @param product 상품
 * @param state 현재 상태
 * @returns 다음 상태
 */
const removeProductFromCart = (productId: number, state: Product[]) => {
  const removedItemIndex = state.findIndex((item) => item.id === productId)

  state.splice(removedItemIndex, 1)

  return [...state]
}

/**
 * 쇼핑 카트 Reducer
 * @param state 현재 상태
 * @param action 액션
 * @returns 다음 상태
 */
export const shopReducer: React.Reducer<Product[], ShopReducerAction> = (
  state: Product[],
  action: ShopReducerAction,
) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return addProductToCart(action.payload, state)
    case REMOVE_PRODUCT:
      return removeProductFromCart(action.payload, state)
    default:
      return state
  }
}
