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
        "container-lg": "min(92%, 87.5rem)",
        "container-md": "min(96%, 48.75rem)",
      },
      colors: {
        "primary-100": "#002855",
        "primary-200": "#f2fbff",
        "primary-300": "#90a2b5",
        "primary-400": "#003952",
        "secondary-100": "#bfd730",
        placeholder: "#8094aa",
      },
      padding: {
        section: "5.75rem",
      },
      gap: {
        section: "5.75rem",
      },
      aspectRatio: {
        "rect-sm": "1.27 / 1",
        "5/4": "5 / 4",
        property: "3 / 2",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
