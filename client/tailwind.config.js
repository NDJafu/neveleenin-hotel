/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      black: colors.black,
      white: colors.white,
      green: {
        50: "#E4FFF1",
        100: "#D1FAE5",
        500: "#10B981",
        700: "#047857",
      },
      neutral: {
        100: "#F0F3FD",
        300: "#E0E3EB",
        500: "#888B97",
        700: "#3C4563",
        900: "#1B1C57",
      },
      red: {
        100: "#FEE2E2",
        500: "#EF4444",
      },
      yellow: {
        500: "#F59E0B",
      },
    },
  },
  plugins: [],
};
