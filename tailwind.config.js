module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}", // Include HTML in src/
    "./src/components/**/*.{js,jsx,ts,tsx}", // Explicitly include components
    "./src/components/common/**/*.{js,jsx,ts,tsx}", // Ensure common components
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00695C',
          dark: '#004D40',
        },
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
};