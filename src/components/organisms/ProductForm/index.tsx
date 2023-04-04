import { Controller, useForm } from 'react-hook-form'
import Button from 'components/atoms/Button'
import Input from 'components/atoms/Input'
import Text from 'components/atoms/Text'
import TextArea from 'components/atoms/TextArea'
import Box from 'components/layout/Box'
import Dropdown from 'components/molecules/Dropdown'
import InputImages, { FileData } from 'components/molecules/InputImages'
import type { Category, Condition } from 'types'

export type ProductFormData = {
  image: FileData[]
  title: string
  description: string
  category: Category
  condition: Condition
  price: string
}

interface ProductFormProps {
  /**
   * 게시 버튼을 클릭했을 때의 이벤트 핸들러
   */
  onProductSave?: (data: ProductFormData) => void
}

/**
 * 상품 게시폼
 */
const ProductForm = ({ onProductSave }: ProductFormProps) => {
  // React Hook Form 사용
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductFormData>()
  const onSubmit = (data: ProductFormData) => {
    onProductSave && onProductSave(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box marginBottom={3}>
        <Box marginBottom={2}>
          <Text as="label" variant="mediumLarge" fontWeight="bold">
            상품 사진
          </Text>
        </Box>
        {/* 상품 이미지 입력 */}
        <Controller
          control={control}
          name="image"
          rules={{ required: true }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputImages
              images={value ?? []}
              onChange={onChange}
              maximumNumber={1}
              hasError={!!error}
            />
          )}
        />
        {errors.image && (
          <Text color="danger" variant="small" paddingLeft={1}>
            Product image is required
          </Text>
        )}
      </Box>

      <Box marginBottom={3}>
        <Box marginBottom={2}>
          <Text as="label" variant="mediumLarge" fontWeight="bold">
            상품 정보
          </Text>
        </Box>
        <Box marginBottom={1}>
          <Text as="label" variant="medium">
            제목
          </Text>
          {/* 상품 제목 입력 */}
          <Input
            {...register('title', { required: true })}
            name="title"
            type="text"
            placeholder="상품 제목"
            hasError={!!errors.title}
          />
          {errors.title && (
            <Text color="danger" variant="small" paddingLeft={1}>
              제목 입력은 필수입니다
            </Text>
          )}
        </Box>
        <Box marginBottom={1}>
          <Text as="label" variant="medium">
            개요
          </Text>
          {/* 상품 개요 입력 */}
          <Controller
            control={control}
            name="description"
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextArea
                placeholder="최고의 상품입니다!"
                hasError={!!error}
                onChange={onChange}
              >
                {value}
              </TextArea>
            )}
          />
          {errors.description && (
            <Text color="danger" variant="small" paddingLeft={1}>
              개요 입력은 필수입니다
            </Text>
          )}
        </Box>
        <Box marginBottom={1}>
          <Text as="label" variant="medium">
            카테고리
          </Text>
          {/* 카테고리 드롭다운 */}
          <Controller
            control={control}
            name="category"
            rules={{ required: true }}
            defaultValue="shoes"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Dropdown
                options={[
                  { value: 'shoes', label: '슈즈' },
                  { value: 'clothes', label: '의류' },
                  { value: 'book', label: '책' },
                ]}
                hasError={!!error}
                value={value}
                placeholder="카테고리를 선택해 주십시오"
                onChange={(v) => onChange(v?.value)}
              />
            )}
          />
          {errors.category && (
            <Text color="danger" variant="small" paddingLeft={1}>
              카테고리 선택은 필수입니다
            </Text>
          )}
        </Box>
        <Box marginBottom={1}>
          <Text as="label" variant="medium">
            상품 상태
          </Text>
          {/* 상품 상태 드롭다운 */}
          <Controller
            control={control}
            name="condition"
            rules={{ required: true }}
            defaultValue="used"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Dropdown
                options={[
                  { value: 'used', label: '중고' },
                  { value: 'new', label: '신품' },
                ]}
                hasError={!!error}
                value={value ?? 'used'}
                placeholder="Please select condition"
                onChange={(v) => onChange(v?.value)}
              />
            )}
          />
          {errors.condition && (
            <Text color="danger" variant="small" paddingLeft={1}>
              상품 상태 입력은 필수입니다
            </Text>
          )}
        </Box>
        <Box>
          <Text as="label" variant="medium">
            가격(원)
          </Text>
          {/* 가격 입력 */}
          <Input
            {...register('price', { required: true })}
            name="price"
            type="number"
            placeholder="1000"
            hasError={!!errors.price}
          />
          {errors.price && (
            <Text color="danger" variant="small" paddingLeft={1}>
              가격의 입력은 필수입니다
            </Text>
          )}
        </Box>
      </Box>
      <Button width="100%" type="submit">
        등록
      </Button>
    </form>
  )
}

export default ProductForm
