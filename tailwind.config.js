/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          default: '#5220AF',
          dark: '#371674',
          medium: '#683CB9',
          light: '#b692f9',
        },
        grays: {
          default: '#9D95AB',
          dark: '#646464',
        },
      },
      screens: {
        '2xlv': '1380px',
      },
    },
  },
  plugins: [],
};
