import type { ApiContext } from 'types'
import { fetcher } from 'utils'

export type PurchaseParams = {
  /**
   * 구입할 상품 ID
   */
  productId: number
}

/**
 * 구입 API(상품 구입)
 * @param context API 컨텍스트
 * @param params 상품 ID
 * @returns 구입 결과의 메시지
 */
const purchase = async (
  context: ApiContext,
  params: PurchaseParams,
): Promise<{ message: string }> => {
  return await fetcher(`${context.apiRootUrl.replace(/\/$/g, '')}/purchases`, {
    method: 'POST',
    headers: {
      Origin: '*',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      credentials: 'include',
    },
    body: JSON.stringify(params),
  })
}

export default purchase
