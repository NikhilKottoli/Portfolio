module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        'raleway': ['Raleway', 'sans-serif'],
      },
      keyframes: {
        jiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        shine: {
          '100%': { transform: 'translateX(100%)' },
        }
      },
      animation: {
        jiggle: 'jiggle 0.6s ease-in-out infinite 2s',
        shine: 'shine 1s',
      },
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}