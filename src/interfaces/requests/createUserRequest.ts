import type { PetSpecies } from "@/enums/PetSpecies";

export interface CreateUserRequest {
  fullName: string;
  cpf: string;
  birthDate: Date | null;
  phone: string;
  zipCode: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  monthlyIncome: string | number;
  hasCar: boolean;
  petSpecies: PetSpecies | string | null;
  petBreed: string | null;
  petOtherBreed: string;
}
