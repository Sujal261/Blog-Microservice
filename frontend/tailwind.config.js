/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // ← removed space after js,
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
