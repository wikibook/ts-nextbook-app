import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import BreadcrumbItem from 'components/atoms/BreadcrumbItem'
import Text from 'components/atoms/Text'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import Breadcrumb from 'components/molecules/Breadcrumb'
import FilterGroup from 'components/molecules/FilterGroup'
import Layout from 'components/templates/Layout'
import ProductCardListContainer from 'containers/ProductCardListContainer'
import type { Category, Condition } from 'types'

const Anchor = styled(Text)`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

const categoryNameDict: Record<Category, string> = {
  book: '책',
  shoes: '신발',
  clothes: '의류',
}

const SearchPage: NextPage = () => {
  const router = useRouter()
  // 상품 카테고리를 쿼리로부터 얻는다
  const slug: Category[] = Array.isArray(router.query.slug)
    ? (router.query.slug as Category[])
    : []
  // 상품 상태를 쿼리로부터 얻는다
  const conditions = (() => {
    if (Array.isArray(router.query.condition)) {
      return router.query.condition as Condition[]
    } else if (router.query.condition) {
      return [router.query.condition as Condition]
    } else {
      return []
    }
  })()

  const handleChange = (selected: string[]) => {
    router.push({
      pathname: router.pathname,
      query: {
        slug,
        condition: selected,
      },
    })
  }

  return (
    <Layout>
      <Box
        paddingLeft={{
          base: 2,
          md: 3,
        }}
        paddingRight={{
          base: 2,
          md: 3,
        }}
        paddingTop={2}
        paddingBottom={2}
      >
        <Box marginBottom={1}>
          <Breadcrumb>
            <BreadcrumbItem>
              <Link href="/">
                <a>톱</a>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link href="/search">
                <a>검색</a>
              </Link>
            </BreadcrumbItem>
            {/* 빵 부스러기 리스트를 선택한 카테고리에서 생성 */}
            {slug.slice(0, slug.length - 1).map((category, i) => (
              <BreadcrumbItem key={i}>
                <Link href={`/search/${slug.slice(0, i + 1).join('/')}`}>
                  <a>{categoryNameDict[category] ?? 'Unknown'}</a>
                </Link>
              </BreadcrumbItem>
            ))}
            {slug.length == 0 && <BreadcrumbItem>모두</BreadcrumbItem>}
            {slug.length > 0 && (
              <BreadcrumbItem>
                {categoryNameDict[slug[slug.length - 1]] ?? 'Unknown'}
              </BreadcrumbItem>
            )}
          </Breadcrumb>
        </Box>
        <Flex>
          <Flex flexDirection={{ base: 'column', md: 'row' }}>
            <Box as="aside" minWidth="200px" marginBottom={{ base: 2, md: 0 }}>
              {/* 상품 상태 필터 */}
              <FilterGroup
                title="상품 상태"
                items={[
                  { label: '새 상품', name: 'new' },
                  { label: '중고 상품', name: 'used' },
                ]}
                value={conditions}
                onChange={handleChange}
              />
              <Box paddingTop={1}>
                <Text as="h2" fontWeight="bold" variant="mediumLarge">
                  카테고리
                </Text>
                <Box>
                  <Link href="/search/" passHref>
                    <Anchor as="a">모두</Anchor>
                  </Link>
                </Box>
                {/* 카테고리 링크 */}
                {Object.keys(categoryNameDict).map(
                  (category: string, i: number) => (
                    <Box key={i} marginTop={1}>
                      <Link href={`/search/${category}`} passHref>
                        <Anchor as="a">
                          {categoryNameDict[category as Category]}
                        </Anchor>
                      </Link>
                    </Box>
                  ),
                )}
              </Box>
            </Box>
            <Box>
              <Text
                as="h2"
                display={{ base: 'block', md: 'none' }}
                fontWeight="bold"
                variant="mediumLarge"
              >
                상품 목록
              </Text>
              {/*
                상품 카드 리스트 컨테이너
                상품 쿼리로부터 상품 카드 리스트를 표시
               */}
              <ProductCardListContainer
                category={slug.length > 0 ? slug[slug.length - 1] : undefined}
                conditions={conditions}
              />
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Layout>
  )
}

export default SearchPage
