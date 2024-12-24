import BaseService from "@/shared/BaseService";

import type { AddressResponse } from "@/interfaces/responses/AddressResponse";

export class AddressService extends BaseService {
  static async GetAddressByPostalCode(
    postalCode: string
  ): Promise<AddressResponse> {
    try {
      const response = await BaseService.get<AddressResponse>(
        `https://viacep.com.br/ws/${postalCode}/json/`
      );
      return response;
    } catch (error: any) {
      console.error("Error in GetAddressByPostalCode:", error);
      throw error;
    }
  }
}
