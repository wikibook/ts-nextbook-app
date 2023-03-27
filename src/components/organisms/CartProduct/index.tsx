import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import Button from 'components/atoms/Button'
import Text from 'components/atoms/Text'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'

// 삭제 버튼의 텍스트
const RemoveText = styled(Text)`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

interface CartProductProps {
  /**
   * 상품 ID
   */
  id: number
  /**
   * 상품 이미지 URL
   */
  imageUrl: string
  /**
   * 상품명
   */
  title: string
  /**
   * 상품 가격
   */
  price: number
  /**
   * 구입 버튼을 클릭했을 때의 이벤트 핸들러
   */
  onBuyButtonClick?: (id: number) => void
  /**
   * 삭제 버튼을 클릭했을 때의 이벤트 핸들러
   */
  onRemoveButtonClick?: (id: number) => void
}

/**
 * 카트 상품
 */
const CartProduct = ({
  id,
  imageUrl,
  title,
  price,
  onBuyButtonClick,
  onRemoveButtonClick,
}: CartProductProps) => {
  return (
    <Flex justifyContent="space-between">
      <Flex>
        <Box width="120px" height="120px">
          <Link href={`/products/${id}`} passHref>
            <a>
              <Image
                quality="85"
                src={imageUrl}
                alt={title}
                height={120}
                width={120}
                objectFit="cover"
              />
            </a>
          </Link>
        </Box>
        <Box padding={1}>
          <Flex
            height="100%"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Box>
              <Text
                fontWeight="bold"
                variant="mediumLarge"
                marginTop={0}
                marginBottom={1}
                as="p"
              >
                {title}
              </Text>
              <Text margin={0} as="p">
                {price}원
              </Text>
            </Box>
            <Flex marginTop={{ base: 2, md: 0 }}>
              {/* 구입 버튼 */}
              <Button
                width={{ base: '100px', md: '200px' }}
                onClick={() => onBuyButtonClick && onBuyButtonClick(id)}
              >
                구입
              </Button>
              {/* 삭제 버튼(모바일) */}
              <Button
                marginLeft={1}
                width={{ base: '100px', md: '200px' }}
                display={{ base: 'block', md: 'none' }}
                variant="danger"
                onClick={() => onRemoveButtonClick && onRemoveButtonClick(id)}
              >
                삭제
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Flex>
      <Box display={{ base: 'none', md: 'block' }}>
        {/* 삭제 버튼(데스크톱) */}
        <RemoveText
          color="danger"
          onClick={() => onRemoveButtonClick && onRemoveButtonClick(id)}
        >
          카트에서 삭제
        </RemoveText>
      </Box>
    </Flex>
  )
}

export default CartProduct
