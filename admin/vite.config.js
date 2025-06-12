import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  server: {
    // eslint-disable-next-line no-undef
    port: process.env.VITE_PORT_ADMIN,
  },
  plugins: [tailwindcss(), react()],
});
