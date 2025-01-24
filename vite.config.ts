import path from "path";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer(),
      ],
    },
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
