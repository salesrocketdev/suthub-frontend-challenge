import axios, { type AxiosInstance } from "axios";

export default defineNuxtPlugin(
  (nuxtApp: { provide: (arg0: string, arg1: AxiosInstance) => void }) => {
    const config = useRuntimeConfig();

    const api = axios.create({
      baseURL: config.public.apiUrl as string,
    });

    api.interceptors.response.use(
      (response) => response,
      (error) => {
        return Promise.reject(error);
      }
    );

    nuxtApp.provide("api", api);
  }
);
