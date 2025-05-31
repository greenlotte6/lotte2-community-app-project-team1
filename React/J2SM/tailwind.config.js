/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // src 폴더 안의 모든 JS, JSX, TS, TSX 파일 포함
    "./public/index.html", // public 폴더의 index.html도 포함 (필요 시)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
