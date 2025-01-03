import { ref } from "vue";

import {
  helpers,
  minLength,
  minValue,
  numeric,
  required,
  requiredIf,
} from "@vuelidate/validators";

import { UserService } from "@/services";

import type { User } from "@/interfaces/entities/User";
import type { UserResponse } from "@/interfaces/responses/UserResponse";
import type { UsersResponse } from "@/interfaces/responses/UsersResponse";
import type { CreateUserRequest } from "@/interfaces/requests/createUserRequest";
import type { ITablePaginationProps } from "@/interfaces/props/ITablePaginationProps";
import type { ITableColumnProps } from "@/interfaces/props/ITableColumnProps";

import { validatePhone, validateCPF } from "@/shared/utils/documentUtils";

export const useUser = () => {
  // Função customizada para validar o valor mínimo
  const minIncomeValidation = helpers.withMessage(
    "A renda mensal deve ser pelo menos R$ 1000",
    (value: string) => {
      const formattedValue = parseFloat(
        value.toString().replace("R$", "").replace(/\./g, "").replace(",", ".")
      );
      return !isNaN(formattedValue) && formattedValue >= 1000;
    }
  );

  const user = ref<User | null>(null);
  const users = ref<User[]>([]);

  const columns = ref<ITableColumnProps[]>([
    { key: "image", title: "Foto", align: "center" },
    { key: "name", title: "Nome Completo", align: "left" },
    { key: "birthDate", title: "Data de Nascimento", align: "center" },
    { key: "gender", title: "Gênero", align: "center" },
    { key: "address", title: "Localização", align: "left" },
    { key: "actions", title: "Ações", align: "center" },
  ]);

  const pagination = ref<ITablePaginationProps>({
    page: 1,
    limit: 20,
    total: 0,
    skip: 0,
  });

  const registerUserFormRules = computed(() => ({
    fullName: {
      required: helpers.withMessage("O nome completo é obrigatório", required),
      minLength: helpers.withMessage(
        "O nome completo deve ter no mínimo 5 caracteres",
        minLength(5)
      ),
    },
    cpf: {
      required: helpers.withMessage("O CPF é obrigatório", required),
      cpfValid: helpers.withMessage("CPF inválido", (value: string) =>
        validateCPF(value.toString().replace(".", "").replace("-", ""))
      ),
    },
    birthDate: {
      required: helpers.withMessage(
        "A data de nascimento é obrigatória",
        required
      ),
      between: helpers.withMessage(
        "A idade deve estar entre 18 e 65 anos",
        (value: string) => {
          const date = new Date(value);
          const today = new Date();
          const age = today.getFullYear() - date.getFullYear();
          return age >= 18 && age <= 65;
        }
      ),
    },
    phone: {
      required: helpers.withMessage("O telefone é obrigatório", required),
      cellPhoneValid: helpers.withMessage(
        "Número de celular inválido",
        (value: string) => validatePhone(value)
      ),
    },
    zipCode: {
      required: helpers.withMessage("O CEP é obrigatório", required),
    },
    street: {
      required: helpers.withMessage("O endereço é obrigatório", required),
    },
    neighborhood: {
      required: helpers.withMessage("O bairro é obrigatório", required),
    },
    city: {
      required: helpers.withMessage("A cidade é obrigatória", required),
    },
    state: {
      required: helpers.withMessage("O estado é obrigatório", required),
    },
    monthlyIncome: {
      required: helpers.withMessage("A renda mensal é obrigatória", required),
      minValue: helpers.withMessage(
        "A renda mensal deve ser pelo menos R$ 1000",
        minIncomeValidation
      ),
    },
    hasCar: {
      required: helpers.withMessage(
        "A resposta sobre ter carro é obrigatória",
        required
      ),
      isYes: helpers.withMessage(
        'É obrigatório selecionar "Sim"',
        (value) => value === true
      ),
    },
    petSpecies: {
      required: helpers.withMessage(
        "A espécie do animal é obrigatória",
        required
      ),
    },
    petBreed: {
      required: helpers.withMessage("A raça do animal é obrigatória", required),
    },
    petOtherBreed: {
      required: helpers.withMessage(
        () => `A raça do animal é obrigatória`,
        requiredIf(
          () =>
            registerUserForm.value.petBreed === "Other" ||
            registerUserForm.value.petBreed === "Outro"
        )
      ),
    },
  }));

  const registerUserForm = ref<CreateUserRequest>({
    fullName: "",
    cpf: "",
    birthDate: null,
    phone: "",
    zipCode: "",
    street: "",
    neighborhood: "",
    city: "",
    state: "",
    monthlyIncome: 0,
    hasCar: false,
    petSpecies: null,
    petBreed: "",
    petOtherBreed: "",
  });

  const getAllUsers = async (page: number = 1, limit: number = 20) => {
    try {
      const response: UsersResponse = await UserService.GetAllUsers(
        page,
        limit
      );

      if (!response || response.users.length == 0) return [];

      users.value = response.users;

      pagination.value = {
        page: page,
        limit: response.limit,
        skip: response.skip,
        total: response.total,
      };

      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const searchUsersByName = async (
    query: string,
    page: number = 1,
    limit: number = 10
  ) => {
    try {
      const response: UsersResponse = await UserService.SearchUsersByName(
        query,
        page,
        limit
      );

      if (!response || response.users.length == 0) return [];

      // Ordenar usuários por ordem alfabética
      response.users.sort((a, b) => {
        const nameA = a.firstName.toLowerCase() + a.lastName.toLowerCase();
        const nameB = b.firstName.toLowerCase() + b.lastName.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });

      users.value = response.users;

      pagination.value = {
        page: page,
        limit: response.limit,
        skip: response.skip,
        total: response.total,
      };

      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const getUserById = async (userId: number) => {
    try {
      const response: UserResponse = await UserService.GetUserById(userId);

      if (!response) return null;

      user.value = response.user;

      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const registerUser = async (payload: CreateUserRequest) => {
    try {
      const response = await UserService.RegisterUser(payload);

      return response;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    user,
    users,
    registerUserFormRules,
    registerUserForm,
    columns,
    pagination,
    getAllUsers,
    searchUsersByName,
    getUserById,
    registerUser,
  };
};
