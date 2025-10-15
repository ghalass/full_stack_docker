import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // permet l’accès depuis l’extérieur du conteneur
    port: 4001, // ton port Vite
    proxy: {
      "/backend_app": {
        target: "http://backend_app:3001", // le nom du service backend dans docker-compose
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/backend_app/, ""),
      },
    },
  },
});
