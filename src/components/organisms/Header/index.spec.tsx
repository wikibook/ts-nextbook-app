import { render, screen, RenderResult } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import Header from '.'
import { AuthContextProvider } from 'contexts/AuthContext'
import { theme } from 'themes'
import type { User, Product } from 'types'

// ShoppingCartContext의 목
jest.mock('contexts/ShoppingCartContext')
// eslint-disable-next-line import/order
import { useShoppingCartContext } from 'contexts/ShoppingCartContext'
// 오리지널 ShoppingCartContextProvider를 취득
const { ShoppingCartContextProvider } = jest.requireActual(
  'contexts/ShoppingCartContext',
)

// 더미 사용자
const authUser: User = {
  id: 1,
  username: 'dummy',
  displayName: 'Taketo Yoshida',
  email: 'test@example.com',
  profileImageUrl: '/images/sample/1.jpg',
  description: '',
}

// 더미 상품
const product: Product = {
  id: 1,
  category: 'book',
  title: 'Product',
  description: '',
  imageUrl: '/images/sample/1.jpg',
  blurDataUrl: '',
  price: 10000,
  condition: 'used',
  owner: authUser,
}

describe('Header', () => {
  let renderResult: RenderResult
  const useShoppingCartContextMock =
    useShoppingCartContext as jest.MockedFunction<typeof useShoppingCartContext>

  it('카트에 상품이 존재한다', async () => {
    useShoppingCartContextMock.mockReturnValue({
      cart: [product],
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      addProductToCart: () => {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      removeProductFromCart: () => {},
    })

    renderResult = render(
      <ThemeProvider theme={theme}>
        <ShoppingCartContextProvider>
          <AuthContextProvider
            authUser={authUser}
            context={{ apiRootUrl: 'https://dummy' }}
          >
            <Header />
          </AuthContextProvider>
        </ShoppingCartContextProvider>
      </ThemeProvider>,
    )

    // 카트에 들어있다(배지가 표시된다)
    expect(screen.getAllByTestId('badge-wrapper').length).toBeGreaterThan(0)

    renderResult.unmount()
    useShoppingCartContextMock.mockReset()
  })

  it('미 로그인', async () => {
    useShoppingCartContextMock.mockReturnValue({
      cart: [],
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      addProductToCart: () => {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      removeProductFromCart: () => {},
    })

    renderResult = render(
      <ThemeProvider theme={theme}>
        <ShoppingCartContextProvider>
          <AuthContextProvider context={{ apiRootUrl: 'https://dummy' }}>
            <Header />
          </AuthContextProvider>
        </ShoppingCartContextProvider>
      </ThemeProvider>,
    )

    // 로그인 하지 않았음
    expect(screen.queryByTestId('profile-shape-image')).toBeNull()

    // 카트가 비어 있음
    expect(screen.queryByTestId('badge-wrapper')).toBeNull()

    renderResult.unmount()
    useShoppingCartContextMock.mockReset()
  })
})
