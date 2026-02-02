/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#111827', // gray-900
        light: '#F9FAFB', // gray-50
        accent: '#6B7280', // gray-500
        primary: '#9CA3AF', // gray-400
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Inter', 'sans-serif'],
      },
      height: {
        'screen-dynamic': '100dvh',
      },
      minHeight: {
        'screen-dynamic': '100dvh',
      },
    },
  },
  plugins: [],
}
