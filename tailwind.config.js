/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: {
          default: "#5220AF",
          dark: "#371674",
        },
        grays: {
          default: "#515151",
        },
      },
    },
  },
  plugins: [],
};
