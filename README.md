## TypeScript와 React/Next.js로 만드는 실전 웹 애플리케이션

「[TypeScript와 React/Next.js로 만드는 실전 웹 애플리케이션](https://gihyo.jp/book/2022/978-4-297-12916-3)」의 샘플 애플리케이션

![샘플 애플리케이션](images/coverpage.png)

## 1판에서의 업데이트

- [빌드가 실패하는 문제 수정](https://github.com/moseskim/ts-nextbook-app/pull/6) (일본어))
- [Storybook이 최신 Next.js에서 동작하지 않는 문제 수정](https://github.com/moseskim/ts-nextbook-app/pull/5) (일본어)

## 환경

- Node.js: 16.14.0
- Next.js: 12.2.3
- React: 18.2.0

## 설치

```bash
npm install
```

## 환경 변수 설정

.env를 연다

```
API_BASE_URL=<백엔드 API로의 기본 URL 설정>
NEXT_PUBLIC_API_BASE_PATH=/api/proxy
```

## 개발 서버 기동

개발 서버를 기동하고, http://localhost:3000/ 에 접속한다

```
npm run dev
```

## Storybook 기동

Storybook을 기동하고, http://localhost:6006/ 에 접속한다

```
npm run storybook
```

## 테스트 실행

단위 테스트 실행

```
npm run test
```

## 소스 코드 린터/포매터

소스 코드를 린터로 확인

```
npm run lint
```

소스 코드를 포매터로 정리

```
npm run format
```

## 디렉터리 구성

간단하게 디렉터리 구성을 다음과 같이 설명합니다.

```
├── .editorconfig
├── .env  <-- 환경 변수
├── .env.production  <-- 프러덕션용 환경 변수
├── .eslintrc.json  <-- ESLint 설정 파일
├── README.md
├── jest.config.js  <-- Jest 설정 파일
├── jest.setup.js  <-- 테스트 파일이 실행되기 전에 실행된다
├── next-env.d.ts
├── next.config.js  <-- Next.js 설정 파일
├── package-lock.json
├── package.json
├── public
├── src
│   ├── components  <-- Presentational Components
│   ├── containers  <-- Container Compoments
│   ├── contexts  <-- React Context
│   ├── pages  <-- Next.js 페이지
│   ├── services  <-- Web API Client
│   ├── themes  <-- styled-components 테마
│   ├── types  <-- 타입 정의
│   └── utils  <-- 범용 함수
└── tsconfig.json
```
