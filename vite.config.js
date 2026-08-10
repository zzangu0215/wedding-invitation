import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages 배포 시 저장소 이름으로 base 경로를 설정합니다.
// 예: https://<username>.github.io/wedding-invitation/ 로 배포한다면
// base 값을 '/wedding-invitation/' 로 유지하세요.
// (커스텀 도메인 또는 <username>.github.io 루트에 배포한다면 base를 '/'로 변경하세요.)
export default defineConfig({
  base: '/wedding-invitation/',
  plugins: [react()],
})
