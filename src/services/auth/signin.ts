// types는 뒤에서 정의
import { ApiContext, User } from 'types'
// 앞에서 정의한 src/utils/index.ts로부터 읽는다
import { fetcher } from 'utils'

export type SigninParams = {
  /**
   * 사용자명
   * 샘플 사용자의 사용자명은 "user"
   */
  username: string
  /**
   * 비밀번호
   * 샘플 사용자의 비밀번호는 "password"
   */
  password: string
}

/**
 * 인증 API(로그인)
 * @param context API 컨텍스트
 * @param params 파라미터
 * @returns 로그인 사용자
 */
const signin = async (
  context: ApiContext,
  params: SigninParams,
): Promise<User> => {
  return await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, '')}/auth/signin`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    },
  )
}

export default signin
