import ShapeImage from 'components/atoms/ShapeImage'
import Text from 'components/atoms/Text'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'

interface UserProfileProps {
  /**
   * 변형(표지 스타일)
   */
  variant?: 'normal' | 'small'
  /**
   * 사용자명
   */
  username: string
  /**
   * 사용자 이미지 URL
   */
  profileImageUrl: string
  /**
   * 사용자가 소유한 상품 수
   */
  numberOfProducts: number
  /**
   * 사용자 설명
   */
  description?: string
}

/**
 * 사용자 프로파일
 */
const UserProfile = ({
  variant = 'normal',
  username,
  profileImageUrl,
  numberOfProducts,
  description,
}: UserProfileProps) => {
  const profileImageSize = variant === 'small' ? '100px' : '120px'

  return (
    <Flex>
      <Box minWidth={profileImageSize}>
        {/* 사용자 이미지 */}
        <ShapeImage
          shape="circle"
          quality="85"
          src={profileImageUrl}
          alt={username}
          height={profileImageSize}
          width={profileImageSize}
        />
      </Box>
      <Box padding={1}>
        <Flex
          height="100%"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box>
            {/* 사용자명 */}
            <Text
              as="p"
              fontWeight="bold"
              variant="mediumLarge"
              marginTop={0}
              marginBottom={1}
            >
              {username}
            </Text>
            {/* 상품 게시 수 */}
            <Text marginBottom={1} marginTop={0} as="p">
              {numberOfProducts}개 제품 게시 완료
            </Text>
            {/* 사용자 개요 */}
            {variant === 'normal' && (
              <Text margin={0} as="p">
                {description}
              </Text>
            )}
          </Box>
        </Flex>
      </Box>
    </Flex>
  )
}

export default UserProfile
