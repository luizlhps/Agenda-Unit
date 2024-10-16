/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          default: '#5220AF',
          dark: '#371674',
          light: '#b692f9',
        },
        grays: {
          default: '#515151',
        },
      },
    },
  },
  plugins: [],
};
