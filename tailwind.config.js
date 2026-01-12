/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./layouts/**/*.html",
    "./content/**/*.html",
    "./themes/careercanvas/**/*.html",
    "./themes/careercanvas/layouts/**/*.html",
    "./assets/js/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      colors: {
        primary: "#2563eb", // biru Tailwind
        secondary: "#1e293b", // abu gelap
      },
    },
  },
  plugins: [],
};
