import type { ApiContext, Product } from 'types'
import { fetcher } from 'utils'

export type AddProductsParams = {
  /**
   * 추가할 상품
   */
  product: Omit<Product, 'id'>
}

/**
 * 제품 API(신규 추가)
 * @param context API 컨텍스트
 * @param params 신규 추가할 상품
 * @returns 신규 추가한 상품
 */
const addProduct = async (
  context: ApiContext,
  { product }: AddProductsParams,
): Promise<Product> => {
  return await fetcher(`${context.apiRootUrl.replace(/\/$/g, '')}/products`, {
    method: 'POST',
    headers: {
      Origin: '*',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      credentials: 'include',
    },
    body: JSON.stringify(product),
  })
}

export default addProduct
