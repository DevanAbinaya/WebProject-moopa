/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        'menu': '0 0 10px 0px rgba(255, 107, 0, 0.1)',
        'light': '0 2px 10px 2px rgba(0, 0, 0, 0.1)',
        'button': '0 0px 5px 0.5px rgba(0, 0, 0, 0.1)',
      },
      textColor: {
        'gray-500': '#6c757d',
      },
      fontWeight: {
        'bold': '700',
      },
      padding: {
        'nav': '5.3rem'
      }
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
