/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        outlineo: "url('../public/icon-o-outline.svg')",
        outlinex: "url('../public/icon-x-outline.svg')",
      },
    },
  },
  plugins: [],
};
