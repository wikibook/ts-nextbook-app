import type { ApiContext, Category, Condition, Product } from 'types'
import { fetcher } from 'utils'

export type GetAllProductsParams = {
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
   * 취득 수
   */
  limit?: number
  /**
   * 페이지 수
   */
  page?: number
}

/**
 * 제품 API(목록 취득)
 * @param context API 컨텍스트
 * @param params 검색 조건
 * @returns 상품 목록
 */
// eslint-disable-next-line complexity
const getAllProducts = async (
  context: ApiContext,
  {
    category,
    conditions,
    userId,
    page,
    limit,
    sort = 'id',
    order = 'desc',
  }: GetAllProductsParams = {},
): Promise<Product[]> => {
  const path = `${context.apiRootUrl.replace(/\/$/g, '')}/products`
  const params = new URLSearchParams()

  category && params.append('category', category)
  conditions &&
    conditions.forEach((condition) => params.append('condition', condition))
  userId && params.append('owner.id', `${userId}`)
  page && params.append('_page', `${page}`)
  limit && params.append('_limit', `${limit}`)
  sort && params.append('_sort', sort)
  order && params.append('_order', order)
  const query = params.toString()

  return await fetcher(query.length > 0 ? `${path}?${query}` : path, {
    headers: {
      Origin: '*',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      credentials: 'include',
    },
  })
}

export default getAllProducts
