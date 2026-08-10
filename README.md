# 박석준 · 이지은 모바일 청첩장

React + Vite로 만든, 단정하고 격식 있는 한 페이지 모바일 청첩장입니다.

## 실행 방법

```bash
npm install
npm run dev
```

터미널에 나오는 주소(기본 `http://localhost:5173/wedding-invitation/`)를 브라우저로 열어 확인하세요.
개발 서버 상태에서 `src/data/weddingData.js`를 수정하면 화면에 바로 반영됩니다.

## 내용 수정하기

**모든 텍스트·날짜·계좌·주소는 `src/data/weddingData.js` 한 파일에서만 수정하면 됩니다.**
다른 파일(컴포넌트, CSS)은 건드리지 않아도 됩니다.

## 사진 추가하기

1. 사진 파일을 `public/` 폴더에 넣습니다. (예: `public/main.jpg`)
2. `src/data/weddingData.js`의 `photos` 항목을 수정합니다.

```js
photos: {
  mainPhoto: '/main.jpg',           // 대표 사진 (표지)
  gallery: ['/gallery-1.jpg', '/gallery-2.jpg'], // 갤러리 (선택, 여러 장 가능)
},
```

사진을 넣지 않으면 자동으로 자리표시자(placeholder)가 표시되므로, 레이아웃을 먼저 확인한 뒤
나중에 사진만 채워 넣어도 됩니다.

## 갤러리 / 카운트다운 켜고 끄기

`weddingData.js`의 `features` 항목에서 조절할 수 있습니다.

```js
features: {
  showCountdown: true, // 예식까지 D-day 카운트다운 표시 여부
  showGallery: true,   // 갤러리 섹션 표시 여부
},
```

## GitHub Pages 배포하기

1. GitHub에 새 저장소를 만들고 이 프로젝트를 push합니다.
2. `vite.config.js`의 `base` 값과 `package.json`의 `homepage` 값을
   실제 저장소 이름/사용자명에 맞게 수정합니다. (기본값: `/wedding-invitation/`)
3. 아래 명령으로 배포합니다.

```bash
npm run deploy
```

빌드 결과가 `gh-pages` 브랜치로 자동 배포됩니다. 저장소 Settings → Pages에서
Source가 `gh-pages` 브랜치로 지정되어 있는지 확인하세요.

## 기술 스택

- React 19 + Vite
- 순수 CSS (별도 UI 라이브러리 없음)
- 폰트: Nanum Myeongjo(제목), Pretendard(본문) — CDN 로드
- 스크롤 애니메이션: IntersectionObserver 기반 은은한 페이드인 (`prefers-reduced-motion` 존중)

## 더 단순한 버전이 필요하다면

의존성/빌드 과정 없이 파일 하나만 열면 바로 보이는 **단일 HTML 파일 버전**도 만들어 드릴 수 있습니다.
(같은 디자인 톤으로, `<style>`과 데이터가 한 파일 안에 들어가는 형태입니다.) 필요하시면 말씀해주세요.
