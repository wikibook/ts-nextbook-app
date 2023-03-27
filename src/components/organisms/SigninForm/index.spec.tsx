import {
  render,
  act,
  screen,
  fireEvent,
  RenderResult,
} from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import SigninForm from '.'
import { theme } from 'themes'

describe('SigninForm', () => {
  let renderResult: RenderResult
  let handleSignin: jest.Mock

  beforeEach(() => {
    // 더미 함수
    handleSignin = jest.fn()
    renderResult = render(
      <ThemeProvider theme={theme}>
        <SigninForm onSignin={handleSignin} />
      </ThemeProvider>,
    )
  })

  afterEach(() => {
    renderResult.unmount()
  })

  it('사용자명과 비밀번호를 입력한 뒤, onSignin이 호출된다', async () => {
    // DOM이 변경되는 것을 보증, React Hook Form의 handleSubmit이 호출될 때까지 대기한다
    await act(async () => {
      // 사용자명 입력
      const inputUsernameNode = screen.getByPlaceholderText(
        /사용자명/,
      ) as HTMLInputElement
      fireEvent.change(inputUsernameNode, { target: { value: 'user' } })
      // 비밀번호 입력
      const inputPasswordNode = screen.getByPlaceholderText(
        /비밀번호/,
      ) as HTMLInputElement
      fireEvent.change(inputPasswordNode, { target: { value: 'password' } })
      // 로그인 버튼을 클릭
      fireEvent.click(screen.getByText('로그인'))
    })

    // handleSignin이 호출되지 않는 것을 확인
    expect(handleSignin).toHaveBeenCalledTimes(1)
  })

  it('사용자명 입력만으로는、변형 에러로 인한 onSignin이 호출되지 않는다', async () => {
    // DOM기 업데이트되는 것을 보증, React Hook Form의 handleSubmit이 호출될 떄까지 대기한다
    await act(async () => {
      // 사용자명 입력
      const inputUsernameNode = screen.getByPlaceholderText(
        /사용자명/,
      ) as HTMLInputElement
      fireEvent.change(inputUsernameNode, { target: { value: 'user' } })
      // 로그인 버튼을 클릭
      fireEvent.click(screen.getByText('サインイン'))
    })

    // handleSignin가 호출되지 않은 것을 확인
    expect(handleSignin).toHaveBeenCalledTimes(0)
  })
})
