/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Roboto Slab"', 'ui-serif', 'Georgia', 'serif'],
        roboto: ['Roboto', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: '#F9F8F5',
        main: '#E81C24',
        dark: '#3A3533',
        'dark-mid': '#6B6868',
        'border-light': '#E5E3DE',
      },
      fontSize: {
        base: ['16px', { lineHeight: '1.5' }],
      },
    },
  },
  plugins: [],
}
