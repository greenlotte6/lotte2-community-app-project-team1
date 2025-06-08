import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // 빌드 결과물 폴더
    emptyOutDir: true, // 기존 dist 폴더 비우기
  },
  server: {
    port: 5173, // 개발 서버 포트 (선택사항)
    open: true, // 자동 브라우저 열기 (선택사항)
  },
  resolve: {
    alias: {
      "@": "/src", // @를 src로 매핑 (선택사항)
    },
  },
  define: {
    // 코드 안에서 참조하는 `global`을 브라우저 전역 객체인 `window`로 치환
    global: "window",
  },
});
