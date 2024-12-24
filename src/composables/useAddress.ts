import { ref } from "vue";

import { AddressService } from "@/services";

import type { AddressResponse } from "@/interfaces/responses/AddressResponse";

export const useAddress = () => {
  const address = ref<AddressResponse | null>(null);

  const getAddressByPostalCode = async (postalCode: string) => {
    try {
      const response: AddressResponse =
        await AddressService.GetAddressByPostalCode(postalCode);

      if (!response) return null;

      address.value = response;

      return response;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    getAddressByPostalCode,
  };
};
