import {
  render,
  screen,
  act,
  fireEvent,
  RenderResult,
} from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import Dropdown from '.'
import { theme } from 'themes'

describe('Dropdown', () => {
  let renderResult: RenderResult
  let handleChange: jest.Mock

  beforeEach(() => {
    // 더미 함수
    handleChange = jest.fn()
    renderResult = render(
      <ThemeProvider theme={theme}>
        <Dropdown
          options={[
            { value: 'used', label: '中古' },
            { value: 'new', label: '新品' },
          ]}
          onChange={handleChange}
        />
      </ThemeProvider>,
    )
  })

  afterEach(() => {
    renderResult.unmount()
  })

  it('파일이 드롭되면 onDrop이 호출된다', async () => {
    // act 함수로 감싸서 풀다운을 열고 있도록 DOM이 업데이트된 것을 보증한다
    await act(async () => {
      // 클릭해서 드롭다운 선택지의 뷰를 표시한다
      const element = await screen.findByTestId('dropdown-control')
      element && fireEvent.mouseDown(element)
    })

    // 드롭다운의 선택지 뷰에서 선택한다
    const elements = await screen.getAllByTestId('dropdown-option')
    elements && fireEvent.click(elements[0])

    expect(handleChange).toHaveBeenCalledTimes(1)
  })
})
