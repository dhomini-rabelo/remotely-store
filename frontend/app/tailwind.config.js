/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        Gray: {
          100: '#FCFCFC',
          200: '#f6f6f5',
          250: '#e7e7e7',
          300: '#DDDDDB',
          500: '#A6A798',
        },
        Black: {
          500: '#040B14',
        },
        Orange: {
          500: '#BA5C3D',
        },
        Green: {
          300: '#DCE362',
          500: '#CED55B',
        },
      },
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '1xl': '1.375rem',
      '2xl': '1.5rem',
      '3xl': '1.625rem',
      '4xl': '1.75rem',
      '5xl': '1.875rem',
      '6xl': '2rem',
    },
    screens: {
      tesm: '414px',
      tsm: '640px',
      tmd: '768px',
      tlg: '1024px',
      txl: '1280px',
      big: '1536px',
      't2xl': '1536px',
      '2xl': {'max': '1536px'},
      xl: {'max': '1280px'},
      lg: {'max': '1024px'},
      md: {'max': '768px'},
      sm: {'max': '640px'},
      esm: {'max': '414px'},
    },
  },
  plugins: [],
}
