import { render, screen, fireEvent, RenderResult } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import Dropzone from '.'
import { theme } from 'themes'

describe('Dropzone', () => {
  let renderResult: RenderResult
  let handleDrop: jest.Mock

  beforeEach(() => {
    handleDrop = jest.fn()
    renderResult = render(
      <ThemeProvider theme={theme}>
        <Dropzone onDrop={handleDrop} />
      </ThemeProvider>,
    )
  })

  afterEach(() => {
    renderResult.unmount()
  })

  it('파일이 드롭되면 onDrop이 호출된다', async () => {
    // 파일을 드롭한다
    const element = await screen.findByTestId('dropzone')
    fireEvent.drop(element, {
      dataTransfer: {
        files: [new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' })],
      },
    })

    // 파일이 입력되었는지 확인
    expect(handleDrop).toHaveBeenCalledTimes(1)
  })
})
