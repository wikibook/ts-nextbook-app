import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import BreadcrumbItem from 'components/atoms/BreadcrumbItem'
import Separator from 'components/atoms/Separator'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import Breadcrumb from 'components/molecules/Breadcrumb'
import Layout from 'components/templates/Layout'
import UserProductCardListContainer from 'containers/UserProductCardListContainer'
import UserProfileContainer from 'containers/UserProfileContainer'
import getAllProducts from 'services/products/get-all-products'
import getAllUsers from 'services/users/get-all-users'
import getUser from 'services/users/get-user'
import type { ApiContext } from 'types'

type UserPageProps = InferGetStaticPropsType<typeof getStaticProps>

const UserPage: NextPage<UserPageProps> = ({
  id,
  user,
  products,
}: UserPageProps) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <Layout>
      <Flex
        paddingTop={2}
        paddingBottom={2}
        paddingLeft={{ base: 2, md: 0 }}
        paddingRight={{ base: 2, md: 0 }}
        justifyContent="center"
      >
        <Box width="1180px">
          <Box marginBottom={2}>
            <Breadcrumb>
              <BreadcrumbItem>
                <Link href="/">
                  <a>톱</a>
                </Link>
              </BreadcrumbItem>
              {user && <BreadcrumbItem>{user.username}</BreadcrumbItem>}
            </Breadcrumb>
          </Box>
          <Box>
            <Box marginBottom={1}>
              {/*
                사용자 프로파일 컨테이너
                사용자 정보를 표시한다. useUser로 항상 최신 데이터를 얻는다.
              */}
              <UserProfileContainer userId={id} user={user} />
            </Box>
            <Box marginBottom={1}>
              <Separator />
            </Box>
            {/*
              사용자 상품 카드 리스트 컨테이너
              사용자가 서유한 상품 카드 리스트를 표시한다. useSearch로 항상 최신 데이터를 얻는다.
            */}
            <UserProductCardListContainer userId={id} products={products} />
          </Box>
        </Box>
      </Flex>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const context: ApiContext = {
    apiRootUrl: process.env.API_BASE_URL || 'http://localhost:5000',
  }
  const users = await getAllUsers(context)
  const paths = users.map((u) => `/users/${u.id}`)

  return { paths, fallback: true }
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const context: ApiContext = {
    apiRootUrl: process.env.API_BASE_URL || 'http://localhost:5000',
  }

  if (!params) {
    throw new Error('params is undefined')
  }

  // 사용자 정보와 사용자가 소유한 상품을 얻고, 정적 페이지를 생성한다
  // 10초 동안 revalidate 상태로 하고, 정적 페이지를 업데이트한다
  const userId = Number(params.id)
  const [user, products] = await Promise.all([
    getUser(context, { id: userId }),
    getAllProducts(context, { userId }),
  ])

  return {
    props: {
      id: userId,
      user,
      products: products ?? [],
    },
    revalidate: 10,
  }
}

export default UserPage
