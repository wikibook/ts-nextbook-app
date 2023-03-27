import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import AppLogo from 'components/atoms/AppLogo'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import Layout from 'components/templates/Layout'
import SigninFormContainer from 'containers/SigninFormContainer'

const SigninPage: NextPage = () => {
  const router = useRouter()
  // 인증 후의 이벤트 핸들러
  const handleSignin = async (err?: Error) => {
    if (!err) {
      // 로그인에 성공하고, 쿼리가 지정되어 있을 때는 해당 URL로 이동한다.
      // 기본은 톱 페이지로 이동한다.
      const redurectTo = (router.query['redirect_to'] as string) ?? '/'

      console.log('Redirecting', redurectTo)
      await router.push(redurectTo)
    }
  }

  return (
    <Layout>
      <Flex
        paddingTop={2}
        paddingBottom={2}
        paddingLeft={{ base: 2, md: 0 }}
        paddingRight={{ base: 2, md: 0 }}
        justifyContent="center"
      >
        <Flex
          width="400px"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box marginBottom={2}>
            <AppLogo />
          </Box>
          <Box width="100%">
            {/*
              로그인폼 컨테이너
              SigninForm의 사용자명/비밀번호로부터 인증 API를 호출하고,
              onSignin 콜백이 호출된다
            */}
            <SigninFormContainer onSignin={handleSignin} />
          </Box>
        </Flex>
      </Flex>
    </Layout>
  )
}

export default SigninPage
