import useSWR from 'swr'
import type { ApiContext, Product } from 'types'

export type UseProductProps = {
  /**
   * 취득할 상품 ID
   */
  id: number
  /**
   * 초기 상태
   */
  initial?: Product
}

export type UseProduct = {
  /**
   * 취득할 상품
   */
  product?: Product
  /**
   * 로드 플래그
   */
  isLoading: boolean
  /**
   * 에러 플래그
   */
  isError: boolean
}

/**
 * 제품 API(개별 취득)의 커스텀훅
 * @param context API 컨텍스트
 * @param params 상품 ID와 초기 상태
 * @returns 상품과 API 호출 상태
 */
const useProduct = (
  context: ApiContext,
  { id, initial }: UseProductProps,
): UseProduct => {
  const { data, error } = useSWR<Product>(
    `${context.apiRootUrl.replace(/\/$/g, '')}/products/${id}`,
  )

  return {
    product: data ?? initial,
    isLoading: !error && !data,
    isError: error,
  }
}

export default useProduct
