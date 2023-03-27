import type { ApiContext, User } from 'types'
import { fetcher } from 'utils'

/**
 * 사용자 API(목록 취득)
 * @param context API 컨텍스트
 * @returns 사용자 목록
 */
const getAllUsers = async (context: ApiContext): Promise<User[]> => {
  return await fetcher(`${context.apiRootUrl.replace(/\/$/g, '')}/users`, {
    headers: {
      Origin: '*',
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
}

export default getAllUsers
