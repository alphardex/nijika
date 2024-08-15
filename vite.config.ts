import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      // Note: Storybook doesn't support ce yet, so turn this off.
      // But when you build the lib, plz turn this on.
      customElement: true,
    }),
  ],
  server: {
    open: true,
  },
  build: {
    lib: {
      entry: "src/components/index.ts",
      formats: ["es"],
    },
    // rollupOptions: {
    //   external: ["vue"],
    // },
  },
});
