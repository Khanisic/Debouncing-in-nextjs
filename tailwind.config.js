/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pink': '#C62368',
        'blue': '#001220',
        'white': '#F5F0F0',
      },
      borderRadius:{
        twenty : '25px',
        fifteen : '15px'
      },
      screens: {
        lg: { max: "1800px" },
        md: { max: "990px" },
        sm: { max: "600px" },
        xs: { max: "400px" },
        minmd: "1700px",
        minlg: { max : "2100px" },
      },
    },
  },
  plugins: [],
}