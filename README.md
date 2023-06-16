# Palette

[![Github Actions](https://github.com/songforthemute/palette/actions/workflows/github-actions.yaml/badge.svg)](https://github.com/songforthemute/palette/actions/workflows/github-actions.yaml)

## **_목차_**

0. [개요](#0-개요)
1. [기술 스택](#1-기술-스택)
2. [프로젝트 상세](#2-프로젝트-상세)
3. [프로젝트 스크립트](#3-프로젝트-스크립트)

---

![preview](public/preview.gif)

---

## _0. 개요_

-   이 프로젝트는 **AI 기반 컬러 추천 웹 애플리케이션**으로, Next.js를 이용해 개발한 풀스택 웹 애플리케이션입니다. _(This project is **AI-based color recommendation web application** developed using Next.js.)_

-   평소 컬러 시스템에 관심이 많기도 하고, 디자인 전공이라 자주 접하기도 합니다. 하지만, 어떤 디자인을 함에 있어 컬러 선정의 고민은 항상 존재하며 중요하지만, 쉽지 않은 문제입니다. 이 문제를 해결해보고자 AI를 통한 추천을 받아, HEX 코드와 RGB 코드로 빠르게 활용할 수 있는 웹 기반 도구를 만들어보자는 생각으로 진행하게 되었습니다. _(I'm usually interested in color systems, and I often encounter them because I'm majoring in design. However, there are always concerns about color selection in any design, but it is not an easy problem is not easy. To solve this problem, I was recommended by AI, and I decided to proceed with the idea of creating a web-based tool that can be used quickly with HEX code and RGB code.)_

-   Project Deployment : [Palette](https://palette-pi.vercel.app)

-   Medium Blog : [https://medium.com/@songforthemute](https://medium.com/@songforthemute)

-   _현재 openai의 api 응답이 느려, 요청에 대한 응답이 도착하기 전에 Vercel의 Response limit time을 초과해 응답을 받지 못하는 경우가 있습니다. 다시 시도하거나, 낮은 개수로 요청해주시기 바랍니다._

-   <details>
       <summary><i>프로젝트 구조(Project structure)</i></summary>

        📦palette
        ┣ 📂.github
        ┃ ┗ 📂workflows
        ┃ ┃ ┗ 📜github-actions.yaml
        ┣ 📂.vscode
        ┃ ┗ 📜settings.json
        ┣ 📂**test**
        ┃ ┣ 📜[id].test.tsx
        ┃ ┗ 📜index.test.tsx
        ┣ 📂components
        ┃ ┣ 📂Atoms
        ┃ ┃ ┣ 📂Button
        ┃ ┃ ┃ ┣ 📜Button.module.css
        ┃ ┃ ┃ ┣ 📜Button.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂Card
        ┃ ┃ ┃ ┣ 📜Card.module.css
        ┃ ┃ ┃ ┣ 📜Card.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂Container
        ┃ ┃ ┃ ┣ 📜Container.module.css
        ┃ ┃ ┃ ┣ 📜Container.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂Form
        ┃ ┃ ┃ ┣ 📜Form.module.css
        ┃ ┃ ┃ ┣ 📜form.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂HorizonLine
        ┃ ┃ ┃ ┣ 📜HorizonLine.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂Input
        ┃ ┃ ┃ ┣ 📜Input.module.css
        ┃ ┃ ┃ ┣ 📜Input.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂Select
        ┃ ┃ ┃ ┣ 📜Select.module.css
        ┃ ┃ ┃ ┣ 📜Select.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┗ 📜index.ts
        ┃ ┣ 📂Contexts
        ┃ ┃ ┣ 📜favorContext.tsx
        ┃ ┃ ┗ 📜sessionStorage.ts
        ┃ ┣ 📂Organisms
        ┃ ┃ ┣ 📂ExampleCards
        ┃ ┃ ┃ ┣ 📜ExampleCards.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂PokedCards
        ┃ ┃ ┃ ┣ 📜PokedCards.module.css
        ┃ ┃ ┃ ┣ 📜PokedCards.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂SearchForm
        ┃ ┃ ┃ ┣ 📜SearchForm.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂SearchResult
        ┃ ┃ ┃ ┣ 📜SearchResult.module.css
        ┃ ┃ ┃ ┣ 📜SearchResult.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┗ 📜index.ts
        ┃ ┣ 📂layout
        ┃ ┃ ┣ 📜index.ts
        ┃ ┃ ┣ 📜layout.module.css
        ┃ ┃ ┗ 📜layout.tsx
        ┃ ┗ 📜index.ts
        ┣ 📂libs
        ┃ ┣ 📜client.ts
        ┃ ┣ 📜customHooks.ts
        ┃ ┣ 📜index.ts
        ┃ ┣ 📜useMutate.ts
        ┃ ┗ 📜utils.ts
        ┣ 📂mocks
        ┃ ┣ 📜handlers.ts
        ┃ ┗ 📜server.ts
        ┣ 📂pages
        ┃ ┣ 📂[id]
        ┃ ┃ ┗ 📜index.tsx
        ┃ ┣ 📂api
        ┃ ┃ ┣ 📜[id].ts
        ┃ ┃ ┗ 📜mock.ts
        ┃ ┣ 📜_app.tsx
        ┃ ┣ 📜_document.tsx
        ┃ ┗ 📜index.tsx
        ┣ 📂public
        ┃ ┣ 📜favicon.ico
        ┃ ┣ 📜next.svg
        ┃ ┣ 📜preview.gif
        ┃ ┣ 📜thirteen.svg
        ┃ ┗ 📜vercel.svg
        ┣ 📂styles
        ┃ ┗ 📜globals.css
        ┣ 📜.env
        ┣ 📜.eslintrc.json
        ┣ 📜.gitattributes
        ┣ 📜.gitignore
        ┣ 📜README.md
        ┣ 📜jest.config.js
        ┣ 📜jest.setup.js
        ┣ 📜next-env.d.ts
        ┣ 📜next.config.js
        ┣ 📜package-lock.json
        ┣ 📜package.json
        ┣ 📜postcss.config.js
        ┣ 📜tailwind.config.js
        ┗ 📜tsconfig.json

    </details>

---

## _1. 기술 스택_

![palette_application](https://github.com/songforthemute/palette/assets/105373350/e864650f-771e-4f38-8e02-04d931d0e579)

-   Language : `TypeScript`

-   Framework : `Next.js`

-   Architecture : `Atomic Design System`

-   State Management : `React Context API`, `Session Storage API`

-   Style : `Tailwind CSS (w/ CSS Module)`

-   Deployment : `Vercel`

-   Others : `Openai`

-   Test : `Jest`, `MSW`

-   Automation: `Github Actions`

---

## _2. 프로젝트 상세_

-   이 프로젝트는 모두 `Next.js`를 이용해 개발한 `Openai` 기반의 컬러 추천 웹 애플리케이션입니다. _(This project is **Openai-based color recommendation web application** developed using Next.js.)_

-   프런트엔드 파트에 **아토믹 디자인 시스템(Atomic Design System)** 아키텍쳐를 커스텀하여 적용했습니다.
    _(**Atomic Design System** architecture has been customized and applied to the front-end part.)_

    > _`Atoms`, `Organisms`, `Pages`의 세 단계로 나누어 컴포넌트를 개발하고, 사용자 인터페이스 디자인의 일관성을 높게 유지할 수 있었습니다. 또한, 하위 컴포넌트에 가까워질수록 순수한 UI 컴포넌트로 사용할 수 있도록 로직과 분리시켰으며, 상위 컴포넌트에 가까울수록 로직에 보다 집중할 수 있도록 시도했습니다._ _(Components were developed in three stages: `Atoms`, `Organisms`, and `Pages`, and user interface design was could gained highly consistent. In addition, we separated it from logic so that it could be used as a pure UI component as it approached the lower component, and tried to focus more on logic as it approached the upper component.)_

-   웹 접근성을 고려하여, `aria-label`, `aria-roleDescription` 등의 WAI-ARIA 속성들을 이용했습니다. _(In consideration of web accessibility, WAI-ARIA attributes such as `aria-label`, `aria-roleDescription` are used.)_

-   검색했던 키워드는 브라우저의 `Session Storage API`를 이용해 세션 스토리지에 기록하여, 반복적인 API 호출을 줄이고 이전의 응답을 보다 빠르게 제공하였습니다. _(Keywords searched were recorded in session storage using the browser's `Session Storage API`, reducing repetitive API calls and providing previous responses quickly.)_

-   Poke한 컬러들의 팔레트는 `React Context API`를 이용하여 관리했습니다. _(The palette of the poked colors was managed using `React Context API`.)_

-   스타일링은 `Tailwind CSS`를 `CSS Module` 방식으로 적용시켰습니다. 폼 컴포넌트는 `React-hook-form`을 이용해 개발하였습니다. _(For styling, `Tailwind CSS` is applied in the `CSS Module`. The form component using `React-hook-form`.)_

-   프로젝트의 배포는 `Vercel` 플랫폼을 이용하여 진행하였습니다. _(The project was deployed using the `Vercel` platform.)_

-   테스트는 `Jest` 프레임워크와 `msw`를 이용해 시행하였습니다. _(The test was conducted using the `Jest` framework and `msw`.)_

---

## _3. 프로젝트 스크립트_

-   ### 이 프로젝트의 개발 환경
    -   Editor : `Visual Studio Code`
    -   OS : `Mac OS Monterey 12.6 (w/ Apple M1)`
    -   Runtime : `Node.js v16.14.0`
    -   Package Manager : `npm`
    -   Browser : `Chrome` | `Safari` | `Vivaldi`

```
npm run dev
# or
npm next dev
# or
yarn dev
```

-   프로젝트를 개발 모드로 실행할 수 있습니다. _(Run the development server)_

    [http://localhost:3000]("http://localhost:3000") 환경에서 실행되며, 기본 포트 넘버는 3000입니다. _(Default port number is 3000.)_

```
npm run build
# or
npm next build
# or
yarn build
```

-   애플리케이션이 `.next` 폴더에 빌드됩니다. _(Be built to `.next` folder.)_

```
# Run test by jest watch mode
npm run test

# Run test by jest & check coverage
npm run test:ci
```

---

<h3 align="center">
<i>
Thank you for visit, <br/>
Have a great day! <br/>
<i>
</h3>

---
