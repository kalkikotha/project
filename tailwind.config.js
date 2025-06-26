/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FFC43F',
          50: '#FFF9EB',
          100: '#FFF3D6',
          200: '#FFE7AD',
          300: '#FFDB84',
          400: '#FFCF5B',
          500: '#FFC43F',
          600: '#F7A422',
          700: '#D18A0A',
          800: '#A86F08',
          900: '#7F5406',
        },
        success: {
          DEFAULT: '#a3be4c',
          50: '#eef5e5',
          100: '#d9e8c4',
          200: '#c2da9f',
          300: '#abcc7a',
          400: '#98c15e',
          500: '#a3be4c',
          600: '#8ba843',
          700: '#6f8635',
          800: '#546527',
          900: '#394419',
        },
        dark: '#222222',
        'light-dark': '#727272',
        grey: '#dbdbdb',
        'light-grey': '#fafafa',
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        heading: ['Nunito', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '3rem',
          xl: '3rem',
          '2xl': '3rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1600px',
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'card': '0px 5px 22px rgba(0, 0, 0, 0.04)',
        'card-hover': '0px 21px 44px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
};