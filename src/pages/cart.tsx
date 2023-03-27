import type { NextPage } from 'next'
import Link from 'next/link'
import BreadcrumbItem from 'components/atoms/BreadcrumbItem'
import Text from 'components/atoms/Text'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import Breadcrumb from 'components/molecules/Breadcrumb'
import Layout from 'components/templates/Layout'
import CartContainer from 'containers/CartContainer'
import { useAuthGuard } from 'utils/hooks'

const CartPage: NextPage = () => {
  // 인증 가드
  useAuthGuard()

  return (
    <Layout>
      <Flex
        paddingTop={2}
        paddingBottom={2}
        paddingLeft={{ base: 2, md: 0 }}
        paddingRight={{ base: 2, md: 0 }}
        justifyContent="center"
      >
        <Box width="1240px">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link href="/">
                <a>톱</a>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>카트</BreadcrumbItem>
          </Breadcrumb>
          <Box>
            <Text display="block" variant="large" as="h1">
              카트
            </Text>
            {/*
              카트 컨테이너
              카트 안에 있는 상품을 표시, 구입, 삭제
            */}
            <CartContainer />
          </Box>
        </Box>
      </Flex>
    </Layout>
  )
}

export default CartPage
