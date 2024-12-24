// types/nuxt.d.ts
import { AxiosInstance } from "axios";

declare module "@nuxt/schema" {
  interface NuxtApp {
    $api: AxiosInstance;
  }
}
