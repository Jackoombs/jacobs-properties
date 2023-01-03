/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["ProximaNova", ...defaultTheme.fontFamily.sans],
        harm: ["HarmoniaSans", "system-ui"],
      },
      maxWidth: {
        "container-lg": "min(92%, 100rem)",
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
        sm: "2rem",
        lg: "5rem",
        md: "3rem",
        xl: "7.75rem",
        section: "6.875rem",
      },
      gap: {
        sm: "2rem",
        lg: "5rem",
        md: "3rem",
        xl: "7.75rem",
        section: "5.75rem",
      },
      aspectRatio: {
        hero: "14 / 11",
        "5/4": "5 / 4",
        property: "3 / 2",
      },
      borderRadius: {
        big: "0.625rem",
      },
      appearance: "textfield",
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
