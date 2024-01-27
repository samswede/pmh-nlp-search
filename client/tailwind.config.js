// tailwind.config.js
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ... (your existing content paths),
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      // ... (any existing theme extensions)
    },
  },
  darkMode: "class",
  plugins: [
    // ... (your existing plugins),
    nextui()
  ],
}
