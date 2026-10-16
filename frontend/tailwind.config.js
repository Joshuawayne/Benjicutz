/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  theme: {
    extend: {
      colors: {
        parlour: {
          bg: "#F4EFE6",
          card: "#ECE5DA",
          dark: "#141210",
          cream: "#FAF7F2",
          accent: "#2233AA", // editorial cobalt from ref 2
          terracotta: "#C86D51",
          gold: "#D4AF37",
        }
      },
      fontFamily: {
        serif: ["'Playfair Display'", "Georgia", "'Times New Roman'", "serif"],
        display: ["'Playfair Display'", "serif"],
        sans: ["'Plus Jakarta Sans'", "Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}
