const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['"Pretendard Variable"', 'sans-serif'],
      display: ['"Plus Jakarta Sans"', '"Pretendard Variable"', 'sans-serif'],
    },
    extend: {
      screens: {
        xs: '475px',
        ...defaultTheme.screens,
      },
    },
  },
  plugins: [],
};
