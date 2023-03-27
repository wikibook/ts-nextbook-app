import useSWR from 'swr'
import type { ApiContext, User } from 'types'

export type UseUserProps = {
  /**
   * 취득할 사용자 ID
   */
  id: number
  /**
   * 초기 상태
   */
  initial?: User
}

export type UseUser = {
  /**
   * 취득할 사용자
   */
  user?: User
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
 * 사용자 API(개별 취득)의 커스텀훅
 * @param context API 컨텍스트
 * @returns 사용자와 API 호출 상태
 */
const useUser = (
  context: ApiContext,
  { id, initial }: UseUserProps,
): UseUser => {
  const { data, error } = useSWR<User>(
    `${context.apiRootUrl.replace(/\/$/g, '')}/users/${id}`,
  )

  return {
    user: data ?? initial,
    isLoading: !error && !data,
    isError: !!error,
  }
}

export default useUser
