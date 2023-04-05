import {
  render,
  act,
  screen,
  fireEvent,
  RenderResult,
} from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import ProductForm from '.'
import { theme } from 'themes'

describe('ProductForm', () => {
  let renderResult: RenderResult
  let handleProductSave: jest.Mock
  // 스텁
  global.URL.createObjectURL = () => 'https://test.com'

  beforeEach(() => {
    // 더미 함수
    handleProductSave = jest.fn()
    renderResult = render(
      <ThemeProvider theme={theme}>
        <ProductForm onProductSave={handleProductSave} />
      </ThemeProvider>,
    )
  })

  afterEach(() => {
    renderResult.unmount()
  })

  it('폼 입력 후, onProductSave가 호출된다', async () => {
    // DOM이 업데이트되는 것을 보증, React Hook Form의 handleSubmit이 호출될 때까지 기다린다
    await act(async () => {
      // 상품 이미지를 입력
      const element = await screen.findByTestId('dropzone')
      fireEvent.drop(element, {
        dataTransfer: {
          files: [
            new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' }),
          ],
        },
      })

      // 상품 제목을 입력
      const inputUsernameNode = screen.getByPlaceholderText(
        /상품 제목/,
      ) as HTMLInputElement
      fireEvent.change(inputUsernameNode, { target: { value: '상품' } })

      // 상품 정보를 입력
      const inputPasswordNode = screen.getByPlaceholderText(
        / 최고의 상품입니다/,
      ) as HTMLInputElement
      fireEvent.change(inputPasswordNode, { target: { value: '테스트테스트' } })

      // 가격을 입력
      const inputPriceNode = screen.getByPlaceholderText(
        /100/,
      ) as HTMLInputElement
      fireEvent.change(inputPriceNode, { target: { value: '100' } })

      // 등록 버튼을 클릭한다
      fireEvent.click(screen.getByText('등록'))
    })

    // handleProductSave가 호출되어 있는 것을 확인
    expect(handleProductSave).toHaveBeenCalledTimes(1)
  })

  it('상품 제목 입력만으로는 변형 에러에 의한 onProductSave가 호출되지 않는다', async () => {
    // DOM이 업데이트되는 것을 보증, React Hook Form의 handleSubmit이 호출될 때까지 기다린다
    await act(async () => {
      // 상품 제목을 입력
      const inputUsernameNode = screen.getByPlaceholderText(
        /상품 제목/,
      ) as HTMLInputElement
      fireEvent.change(inputUsernameNode, { target: { value: '상품' } })

      // 등록 버튼을 클릭
      fireEvent.click(screen.getByText('등록'))
    })

    // handleProductSave가 호출되지 않은 것을 확인
    expect(handleProductSave).toHaveBeenCalledTimes(0)
  })
})
