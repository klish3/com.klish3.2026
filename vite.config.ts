import react from "@vitejs/plugin-react";
import tailwind from "tailwindcss";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
    server: {
    origin: 'http://localhost:3000',
    port: 3000,
  },

  plugins: [react()],
  base: "/",
  build: {
    target: ['es2022', 'chrome89', 'edge89', 'firefox89', 'safari15'],
    assetsDir: 'assets',
  },
  css: {
    postcss: {
      plugins: [tailwind()],
    },
  },
});
