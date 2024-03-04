/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '250px',
      md: '500px',
      lg: '1000px',
      xl: '2000px',
    },
    extend: {},
  },
  plugins: [],
}