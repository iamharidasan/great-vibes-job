/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        grey: "#d8d8d8",
        grey7a: "#7A7A7A",
        lightblack: "#212427",
        skyblue: "#1597E4",
        darkgrey: "#182021",
        black21: "#212121",
        alertred: "#D86161",
        greyborder: "#E6E6E6",
      },
      fontFamily: {
        display: ["Poppins"],
      },
    },
  },
  plugins: [],
}
