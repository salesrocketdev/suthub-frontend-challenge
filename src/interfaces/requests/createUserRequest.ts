import type { PetSpecies } from "@/enums/PetSpecies";

export interface CreateUserRequest {
  fullName: string;
  cpf: string;
  birthDate: Date;
  phone: string;
  zipCode: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  monthlyIncome: number;
  hasCar: boolean;
  petSpecies: PetSpecies | string;
  petBreed: string;
  petOtherBreed: string;
}
