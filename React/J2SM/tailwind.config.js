/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/main/MainPage.jsx",
    "./src/components/common/Footer.jsx",
    "./src/components/common/Header.jsx",
    "./src/components/lading/Main.jsx",
    "./src/components/main/FeatureIntro.jsx",
    "./src/components/main/ImageList.jsx",
    "./public/index.html", // public 폴더의 index.html도 포함 (필요 시)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
