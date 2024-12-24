export const isLoading = ref(false);

export default class BaseService {
  // Métodos HTTP básicos com tratamento de erros
  static async get<T>(url: string, params?: any): Promise<T> {
    const { $api: AxiosInstance } = useNuxtApp();

    try {
      isLoading.value = true;

      const response = await AxiosInstance.get<T>(url, { params });
      return response.data;
    } catch (error: any) {
      console.error(`Error in GET request to ${url}:`, error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  static async post<T>(url: string, data: any): Promise<T> {
    const { $api: AxiosInstance } = useNuxtApp();

    isLoading.value = true;

    try {
      const response = await AxiosInstance.post<T>(url, data);
      return response.data;
    } catch (error: any) {
      console.error(`Error in POST request to ${url}:`, error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  static async put<T>(url: string, data: any): Promise<T> {
    const { $api: AxiosInstance } = useNuxtApp();

    isLoading.value = true;

    try {
      const response = await AxiosInstance.put<T>(url, data);
      return response.data;
    } catch (error: any) {
      console.error(`Error in PUT request to ${url}:`, error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  static async delete<T>(url: string): Promise<T> {
    const { $api: AxiosInstance } = useNuxtApp();

    isLoading.value = true;

    try {
      const response = await AxiosInstance.delete<T>(url);
      return response.data;
    } catch (error: any) {
      console.error(`Error in DELETE request to ${url}:`, error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  }
}
