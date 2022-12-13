/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        "container-lg": "min(92%, 1400px )",
      },
      colors: {
        "primary-100": "#00274e",
        "primary-200": "#f2fbff",
        "primary-300" : "#90a2b5",
        "secondary-100": "#bfd730",
      },
      padding: {
        section: "92px",
      },
      aspectRatio: {
        "rect-sm": "1.27 / 1",
      },
    },
  },
  plugins: [],
};
