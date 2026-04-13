/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0D6EFD',
        'primary-dark': '#0a58ca',
        secondary: '#8BC34A',
        'secondary-dark': '#6fa32e',
        emergency: '#DC3545',
        dark: '#212529',
        'gray-light': '#F8F9FA',
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}