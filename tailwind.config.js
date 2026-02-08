/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: '#f7f3f0',
          100: '#ede7e3',
          200: '#d4c4b8',
          300: '#bca38f',
          400: '#a38366',
          500: '#8b6344',
          600: '#735438',
          700: '#5b442c',
          800: '#433521',
          900: '#2b2616',
        }
      }
    },
  },
  plugins: [],
}
