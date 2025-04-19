module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00695C',
          dark: '#004D40',
        },
        // Add secondary color definition
        secondary: {
          DEFAULT: '#F5F5F5',
          100: '#F5F5F5',
          200: '#EEEEEE',
          300: '#E0E0E0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}