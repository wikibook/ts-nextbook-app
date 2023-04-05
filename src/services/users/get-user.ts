import type { ApiContext, User } from 'types'
import { fetcher } from 'utils'

export type GetUserParams = {
  /**
   * 사용자 ID
   */
  id: number
}

/**
 * 사용자 API(개별 취득)
 * @param context API 컨텍스트
 * @param params 파라미터
 * @returns 사용자
 */
const getUser = async (
  context: ApiContext,
  { id }: GetUserParams,
): Promise<User> => {
  /**
  // 사용자 API
  // 샘플 응답
  {
    "id": "1",
    "username": "hana",
    "displayName": "Hana Kim",
    "email": "hana.kim@example.com",
    "profileImageUrl": "/users/1.png",
    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
  }
   */
  return await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, '')}/users/${id}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  )
}

export default getUser
