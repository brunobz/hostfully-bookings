import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcssPlugin from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcssPlugin()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
