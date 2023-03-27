import type { ApiContext, Product } from 'types'
import { fetcher } from 'utils'

export type GetProductParams = {
  /**
   * 취득할 상품
   */
  id: number
}

/**
 * 제품 API(개별 취득)
 * @param context API 컨텍스트
 * @param params 상품 ID
 * @returns 상품
 */
const getProduct = async (
  context: ApiContext,
  { id }: GetProductParams,
): Promise<Product> => {
  return await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, '')}/products/${id}`,
    {
      headers: {
        Origin: '*',
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  )
}

export default getProduct
