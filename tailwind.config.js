/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-cream": "var(--color-primary-cream)",
        "primary-orange": "var(--color-primary-orange)",
        navy: "var(--color-navy)",
        army: "var(--color-army-green)",
        mango: {
          2: "var(--color-mango-2)",
          7: "var(--color-mango-7)",
        },
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
        rubik: ["var(--font-rubik)", "sans-serif"],
        playfair: ["var(--font-playfair-display)", "serif"],
        sauce: ["var(--font-sauce)", "cursive"],
        ganttie: ["var(--font-ganttie)", "cursive"],
        crustaceans: ["var(--font-crustaceans)", "cursive"],
        kg: ["var(--font-kg)", "cursive"],
      },
    },
  },
  plugins: [],
};
