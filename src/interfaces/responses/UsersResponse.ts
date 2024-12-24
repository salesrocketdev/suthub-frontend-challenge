import type { User } from "../entities/User";

export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}
