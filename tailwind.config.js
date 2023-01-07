/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
     
      textColor: {
        'gray-500': '#6c757d',
      },
      fontWeight: {
        'bold': '700',
      },
    },
    fontFamily: {
      outfit: ["Outfit", "sans-serif"],
      karla: ["Karla", "sans-serif"],
      roboto: ["Roboto", "sans-serif"],
    },
  },
  variants: {
    extend: {
      display: ['group-focus'],
      opacity: ['group-focus'],
      inset: ['group-focus'],
      backgroundImage: ['dark']
    },
    textColor: ['responsive', 'hover', 'focus'],
    fontWeight: ['responsive', 'hover', 'focus'],
  },
  plugins: [
  ],
}
