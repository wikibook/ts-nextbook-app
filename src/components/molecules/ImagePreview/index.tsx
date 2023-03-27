import styled from 'styled-components'
import { CloseIcon } from 'components/atoms/IconButton'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'

const ImagePreviewContainer = styled(Box)`
  position: relative;
`

const CloseBox = styled(Flex)`
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
  height: 30px;
  border-radius: 0 6px 0 6px;
  background-color: rgba(44, 44, 44, 0.66);
  cursor: pointer;
`

interface ImagePreviewProps {
  /**
   * 이미지 URL
   */
  src?: string
  /**
   * 대체 텍스트
   */
  alt?: string
  /**
   * 세로폭
   */
  height?: string
  /**
   * 가로폭
   */
  width?: string
  /**
   * 삭제 버튼을 클릭했을 떄의 이벤트 핸들러
   */
  onRemove?: (src: string) => void
}

/**
 * 이미지 미리보기
 */
const ImagePreview = ({
  src,
  alt,
  height,
  width,
  onRemove,
}: ImagePreviewProps) => {
  // 닫기 버튼을 클릭하면 onRemove를 호출한다
  const handleCloseClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    onRemove && src && onRemove(src)

    return false
  }

  return (
    <ImagePreviewContainer height={height} width={width}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} height={height} width={width} />
      <CloseBox
        alignItems="center"
        justifyContent="center"
        onClick={handleCloseClick}
      >
        <CloseIcon size={24} color="white" />
      </CloseBox>
    </ImagePreviewContainer>
  )
}

export default ImagePreview
