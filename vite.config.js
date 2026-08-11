import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

// GitHub Pages 배포 시 저장소 이름으로 base 경로를 설정합니다.
// 예: https://<username>.github.io/wedding-invitation/ 로 배포한다면
// base 값을 '/wedding-invitation/' 로 유지하세요.
// (커스텀 도메인 또는 <username>.github.io 루트에 배포한다면 base를 '/'로 변경하세요.)
export default defineConfig({
  base: '/wedding-invitation/',
  plugins: [react()],
  build: {
    rollupOptions: {
      // 페이지가 두 개입니다.
      //   index.html    - 가족·지인용 청첩장
      //   business.html - 거래처 송부용 간략 버전 (링크 미리보기 제목이 다릅니다)
      // 미리보기 제목은 크롤러가 정적 HTML에서 읽어가므로 진입점을 따로 두어야 합니다.
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        business: resolve(import.meta.dirname, 'business.html'),
      },
    },
  },
})
