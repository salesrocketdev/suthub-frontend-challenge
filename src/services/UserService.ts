import BaseService from "@/shared/BaseService";

import type { UsersResponse } from "@/interfaces/responses/UsersResponse";
import type { UserResponse } from "@/interfaces/responses/UserResponse";
import type { CreateUserRequest } from "@/interfaces/requests/createUserRequest";

export class UserService extends BaseService {
  static async GetAllUsers(
    page: number = 1,
    limit: number = 20
  ): Promise<UsersResponse> {
    try {
      const skip = (page - 1) * limit;

      const response = await BaseService.get<UsersResponse>("users", {
        sortBy: "firstName",
        order: "asc",
        limit,
        skip,
      });
      return response;
    } catch (error: any) {
      console.error("Error in GetAllUsers:", error);
      throw error;
    }
  }

  static async SearchUsersByName(
    query: string,
    page: number = 1,
    limit: number = 20
  ): Promise<UsersResponse> {
    try {
      const skip = (page - 1) * limit;

      const response = await BaseService.get<UsersResponse>("users/search", {
        q: query,
        limit,
        skip,
      });

      return response;
    } catch (error: any) {
      console.error(`Error in SearchUsersByName: ${query}`, error);
      throw error;
    }
  }

  static async GetUserById(userId: number): Promise<UserResponse> {
    try {
      const response = await BaseService.get<UserResponse>(`users/${userId}`);

      return response;
    } catch (error: any) {
      console.error(`Error in GetUserById: ${userId}`, error);
      throw error;
    }
  }

  static async RegisterUser(
    payload: CreateUserRequest
  ): Promise<CreateUserRequest> {
    try {
      // Simulação de requisição POST
      const response = await BaseService.post<CreateUserRequest>(
        "https://jsonplaceholder.typicode.com/posts",
        payload
      );

      return response;
    } catch (error: any) {
      console.error("Error in RegisterUser:", error);
      throw error;
    }
  }
}
