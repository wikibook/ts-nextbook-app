import styled from 'styled-components'

// 배지 원형
const BadgeWrapper = styled.div<{ backgroundColor: string }>`
  border-radius: 20px;
  height: 20px;
  min-width: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ backgroundColor }) => backgroundColor};
`

// 배지 내부 텍스트
const BadgeText = styled.p`
  color: white;
  font-size: 11px;
  user-select: none;
`

interface BadgeProps {
  /**
   * 배지 내부 텍스트
   */
  content: string
  /**
   * 배지 색상
   */
  backgroundColor: string
}

/**
 * 배지
 */
const Badge = ({ content, backgroundColor }: BadgeProps) => {
  return (
    <BadgeWrapper backgroundColor={backgroundColor}>
      <BadgeText>{content}</BadgeText>
    </BadgeWrapper>
  )
}

export default Badge
