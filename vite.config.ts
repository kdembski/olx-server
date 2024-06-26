import { defineConfig } from "vite";
import { URL, fileURLToPath } from "node:url";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@@prisma": fileURLToPath(new URL("./prisma", import.meta.url)),
    },
  },
});
