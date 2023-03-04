/** @type {import('tailwindcss').Config} */
const scrollbarPlugin = require("tailwind-scrollbar");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        text: "text 5s ease infinite",
      },
      keyframes: {
        text: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
      boxShadow: {
        menu: "0 0 10px 0px rgba(255, 107, 0, 0.1)",
        light: "0 2px 10px 2px rgba(0, 0, 0, 0.1)",
        button: "0 0px 5px 0.5px rgba(0, 0, 0, 0.1)",
      },
      textColor: {
        "gray-500": "#6c757d",
      },
      fontWeight: {
        bold: "700",
      },
      padding: {
        nav: "5.3rem",
      },
    },
    fontFamily: {
      rama: ["Ramabhadra", "sans-serif"],
      outfit: ["Outfit", "sans-serif"],
      karla: ["Karla", "sans-serif"],
      roboto: ["Roboto", "sans-serif"],
    },
  },
  variants: {
    extend: {
      display: ["group-focus"],
      opacity: ["group-focus"],
      inset: ["group-focus"],
      backgroundImage: ["dark"],
    },
    textColor: ["responsive", "hover", "focus"],
    fontWeight: ["responsive", "hover", "focus"],
    scrollbar: ["rounded"],
  },
  plugins: [
    scrollbarPlugin({
      nocompatible: true,
    }),
    require("tailwind-scrollbar-hide"),
  ],
};
