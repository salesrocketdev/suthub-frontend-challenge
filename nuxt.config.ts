// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  srcDir: "src/",
  css: ["~/assets/css/tailwind.css"],

  typescript: {
    strict: true,
  },

  plugins: [
    "~/plugins/axios.ts",
    "~/plugins/maskito.ts",
    "~/plugins/money3.ts",
  ],

  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
    },
  },

  modules: ["@nuxtjs/tailwindcss", "@nuxt/image"],
});
