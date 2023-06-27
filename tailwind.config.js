/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        bangers: ["Bangers", "cursive"],
      },
      rotate: {
        15: "15deg",
      },
    },
  },
  plugins: [],
};
