module.exports = {
  purge: [],
  darkMode: 'class', // or 'media' or 'class'
   content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {}
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
