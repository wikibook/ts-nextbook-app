import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuthContext } from 'contexts/AuthContext'

export const useAuthGuard = (): void => {
  const router = useRouter()
  const { authUser, isLoading } = useAuthContext()

  useEffect(() => {
    // 사용자를 얻을 수 없을 때는 로그인 페이지로 리다이렉트
    if (!authUser && !isLoading) {
      const currentPath = router.pathname

      router.push({
        pathname: '/signin',
        query: {
          redirect_to: currentPath,
        },
      })
    }
  }, [router, authUser, isLoading])
}
