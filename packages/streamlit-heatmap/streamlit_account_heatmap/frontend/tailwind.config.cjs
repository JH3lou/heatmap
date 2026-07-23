const colors = [
  "slate", "gray", "zinc", "neutral", "stone",
  "red", "orange", "amber", "yellow", "lime", "green", "emerald", "teal",
  "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink", "rose",
]
const shades = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"]
const colorGroup = colors.join("|")
const shadeGroup = shades.join("|")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    // Shared source of the React heatmap package.
    "../../../heatmap-react/src/**/*.{ts,tsx}",
  ],
  safelist: [
    // Category colors are supplied at runtime from the Python config.
    { pattern: new RegExp(`^bg-(${colorGroup})-(${shadeGroup})$`) },
    { pattern: new RegExp(`^text-(${colorGroup})-(${shadeGroup})$`) },
    { pattern: new RegExp(`^ring-(${colorGroup})-(${shadeGroup})$`) },
    { pattern: new RegExp(`^border-(${colorGroup})-(${shadeGroup})$`) },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
