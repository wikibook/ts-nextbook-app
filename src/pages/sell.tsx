import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import AppLogo from 'components/atoms/AppLogo'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import Layout from 'components/templates/Layout'
import ProductFormContainer from 'containers/ProductFormContainer'
import { useAuthContext } from 'contexts/AuthContext'
import { useAuthGuard } from 'utils/hooks'

const SellPage: NextPage = () => {
  const router = useRouter()
  const { authUser } = useAuthContext()

  const handleSave = (err?: Error) => {
    if (authUser && !err) {
      // 성공하면 사용자 페이지로 이동한다
      router.push(`/users/${authUser.id}`)
    }
  }

  // 인증 가드
  useAuthGuard()

  return (
    <Layout>
      <Flex
        paddingTop={{
          base: 2,
          md: 4,
        }}
        paddingBottom={{
          base: 2,
          md: 4,
        }}
        paddingLeft={{ base: 2, md: 0 }}
        paddingRight={{ base: 2, md: 0 }}
        justifyContent="center"
      >
        <Flex
          width="800px"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box display={{ base: 'none', md: 'block' }} marginBottom={2}>
            <AppLogo />
          </Box>
          <Box width="100%">
            {/*
              상품 게시폼 컨테이너
              상품 정보를 입력하고 제품 API를 통해 상품을 저장
            */}
            <ProductFormContainer onSave={handleSave} />
          </Box>
        </Flex>
      </Flex>
    </Layout>
  )
}

export default SellPage
