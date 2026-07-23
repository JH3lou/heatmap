import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import path from "path"

// The Streamlit React component is a thin wrapper around the shared source of
// the `@jh3lou/account-heatmap` package. We alias to its `src` so there is a
// single source of truth (no pre-build of the React package required).
const heatmapSrc = path.resolve(__dirname, "../../../heatmap-react/src")

export default defineConfig({
  // Relative base so the built assets resolve correctly when Streamlit serves
  // them from the component's build directory.
  base: "./",
  plugins: [react(), tailwindcss()],
  // Tailwind is handled by the Vite plugin above; provide an inline (empty)
  // PostCSS config so Vite does not walk up and pick the demo app's root
  // postcss.config.mjs.
  css: {
    postcss: {},
  },
  resolve: {
    alias: {
      "@heatmap": heatmapSrc,
    },
  },
  server: {
    port: 3001,
    fs: {
      // Allow Vite to serve the aliased React package source during dev.
      allow: [path.resolve(__dirname, "../../..")],
    },
  },
  build: {
    outDir: "build",
    emptyOutDir: true,
  },
})
