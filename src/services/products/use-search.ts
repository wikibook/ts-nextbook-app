import useSWR from 'swr'
import type { ApiContext, Category, Condition, Product } from 'types'

export type UseSearchProps = {
  /**
   * 상품 카테고리
   */
  category?: Category
  /**
   * 상품 상태
   */
  conditions?: Condition[]
  /**
   * 소유한 사용자 ID
   */
  userId?: number
  /**
   * 정렬할 키
   */
  sort?: keyof Omit<Product, 'owner'>
  /**
   * 오름차순 또는 내림차순
   */
  order?: 'asc' | 'desc'
  /**
   * 초기 상태
   */
  initial?: Product[]
}

export type UseSearch = {
  /**
   * 검색에 일치한 상품 리스트
   */
  products: Product[]
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
 * 제품 API(목록 취득)의 커스텀훅
 * @param context API 컨텍스트
 * @param params 검색 조건
 * @returns 상품 목록과 API 호출 상태
 */
const useSearch = (
  context: ApiContext,
  {
    category,
    userId,
    conditions,
    initial,
    sort = 'id',
    order = 'desc',
  }: UseSearchProps = {},
): UseSearch => {
  const path = `${context.apiRootUrl.replace(/\/$/g, '')}/products`
  const params = new URLSearchParams()

  category && params.append('category', category)
  userId && params.append('owner.id', `${userId}`)
  conditions &&
    conditions.forEach((condition) => params.append('condition', condition))
  sort && params.append('_sort', sort)
  order && params.append('_order', order)
  const query = params.toString()
  const { data, error } = useSWR<Product[]>(
    query.length > 0 ? `${path}?${query}` : path,
  )

  return {
    products: data ?? initial ?? [],
    isLoading: !error && !data,
    isError: !!error,
  }
}

export default useSearch
