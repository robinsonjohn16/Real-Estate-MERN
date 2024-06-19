import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
   server: {
      cors: false,
      proxy: {
         "/v1": {
            target: "http://localhost:4000/api/",
            changeOrigin: true,
            secure: false,
         },
      },
   },
   plugins: [react()],
});
