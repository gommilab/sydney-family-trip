/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // 시드니 바다 느낌의 블루
        ocean: {
          50: "#eff8ff",
          100: "#dbedff",
          200: "#bfe0ff",
          300: "#93cdff",
          400: "#60b0ff",
          500: "#3b8ff7",
          600: "#256fe6",
          700: "#1f59cf",
          800: "#1f4aa8",
          900: "#1f4185",
        },
        // 모래색
        sand: {
          50: "#fdf8ef",
          100: "#faedd2",
          200: "#f3d89f",
          300: "#ebbe6c",
          400: "#e3a649",
          500: "#d28a32",
        },
        // 연한 그린
        leaf: {
          50: "#f0faf0",
          100: "#dbf3dc",
          200: "#bce7bf",
          300: "#8fd496",
          400: "#5cbb69",
          500: "#3aa049",
        },
        // 부드러운 오렌지 (경고/주의)
        warn: {
          50: "#fff6ed",
          100: "#ffe9d3",
          200: "#ffcfa5",
          300: "#ffac6c",
          400: "#fb8638",
          500: "#f06a17",
        },
      },
      fontFamily: {
        sans: [
          "'Pretendard'",
          "'Apple SD Gothic Neo'",
          "'Malgun Gothic'",
          "system-ui",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 1px 3px rgba(31, 65, 133, 0.06), 0 4px 12px rgba(31, 65, 133, 0.06)",
      },
    },
  },
  plugins: [],
};
