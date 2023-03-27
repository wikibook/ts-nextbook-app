import React, { useState, useRef, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { CloudUploadIcon } from 'components/atoms/IconButton'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDragEvt = (value: any): value is React.DragEvent => {
  return !!value.dataTransfer
}

const isInput = (value: EventTarget | null): value is HTMLInputElement => {
  return value !== null
}

/**
 * 이벤트로부터 입력된 파일을 얻는다
 * @param e DragEventかChangeEvent
 * @returns File의 배열
 */
const getFilesFromEvent = (e: React.DragEvent | React.ChangeEvent): File[] => {
  if (isDragEvt(e)) {
    return Array.from(e.dataTransfer.files)
  } else if (isInput(e.target) && e.target.files) {
    return Array.from(e.target.files)
  }

  return []
}

// 파일의 Content-Type
type FileType =
  | 'image/png'
  | 'image/jpeg'
  | 'image/jpg'
  | 'image/gif'
  | 'video/mp4'
  | 'video/quicktime'
  | 'application/pdf'

interface DropzoneProps {
  /**
   * 입력 파일
   */
  value?: File[]
  /**
   * <input />의 name 속성
   */
  name?: string
  /**
   * 허가된 파일 타입
   */
  acceptedFileTypes?: FileType[]
  /**
   * 가로폭
   */
  width?: number | string
  /**
   * 세로폭
   */
  height?: number | string
  /**
   * 변형 에러 플래그
   */
  hasError?: boolean
  /**
   * 파일이 드롭 입력되었을 때의 이벤트 핸들러
   */
  onDrop?: (files: File[]) => void
  /**
   * 파일이 입력되었을 때의 이벤트 핸들러
   */
  onChange?: (files: File[]) => void
}

type DropzoneRootProps = {
  isFocused?: boolean
  hasError?: boolean
  width: string | number
  height: string | number
}

// 드롭존 바깥쪽의 형태
const DropzoneRoot = styled.div<DropzoneRootProps>`
  border: 1px dashed
    ${({ theme, isFocused, hasError }) => {
      if (hasError) {
        return theme.colors.danger
      } else if (isFocused) {
        return theme.colors.black
      } else {
        return theme.colors.border
      }
    }};
  border-radius: 8px;
  cursor: pointer;
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}px` : height};
`

// 드롭존 내용
const DropzoneContent = styled.div<{
  width: string | number
  height: string | number
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}px` : height};
`

const DropzoneInputFile = styled.input`
  display: none;
`

/**
 * 드롭존
 * 파일의 입력을 받는다
 */
const Dropzone = (props: DropzoneProps) => {
  const {
    onDrop,
    onChange,
    value = [],
    name,
    acceptedFileTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'],
    hasError,
    width = '100%',
    height = '200px',
  } = props
  const rootRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFocused(false)

    const files = value.concat(
      getFilesFromEvent(e).filter((f) =>
        acceptedFileTypes.includes(f.type as FileType),
      ),
    )

    onDrop && onDrop(files)
    onChange && onChange(files)
  }

  // 드래그 상태의 마우스 포인터가 범위 안에 드롭되었을 때
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFocused(false)

    const files = value.concat(
      getFilesFromEvent(e).filter((f) =>
        acceptedFileTypes.includes(f.type as FileType),
      ),
    )

    if (files.length == 0) {
      return window.alert(
        `次のファイルフォーマットは指定できません${acceptedFileTypes.join(
          ' ,',
        )})`,
      )
    }

    onDrop && onDrop(files)
    onChange && onChange(files)
  }

  // 드래그 상태의 마우스 포인터가 범위 안에 있을 때
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  // 드래그 상태의 마우스 포인터가 범위 밖으로 사라졌을 때 포커스를 없앤다
  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFocused(false)
  }, [])

  // 드래그 상태의 마우스 포인터가 범위 안에 들어왔을 때 포커스를 할당한다
  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFocused(true)
  }, [])

  // 파일 선택 대화 상자를 표시한다
  const handleClick = () => {
    inputRef.current?.click()
  }

  useEffect(() => {
    if (inputRef.current && value && value.length == 0) {
      inputRef.current.value = ''
    }
  }, [value])

  return (
    <>
      {/* 드래그 앤 드롭 이벤트를 관리한다 */}
      <DropzoneRoot
        ref={rootRef}
        isFocused={isFocused}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDragEnter={handleDragEnter}
        onClick={handleClick}
        hasError={hasError}
        width={width}
        height={height}
        data-testid="dropzone"
      >
        {/* 더미 입력 */}
        <DropzoneInputFile
          ref={inputRef}
          type="file"
          name={name}
          accept={acceptedFileTypes.join(',')}
          onChange={handleChange}
          multiple
        />
        <DropzoneContent width={width} height={height}>
          <CloudUploadIcon size={24} />
          <span style={{ textAlign: 'center' }}>기기에서 업로드</span>
        </DropzoneContent>
      </DropzoneRoot>
    </>
  )
}

Dropzone.defaultProps = {
  acceptedFileTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'],
  hasError: false,
}

export default Dropzone
