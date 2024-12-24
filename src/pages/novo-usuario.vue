<template>
  <div class="max-w-3xl mx-auto p-4">
    <form @submit.prevent="handleSubmit()">
      <h1 class="text-2xl font-bold mb-6">Cadastro de Usuário</h1>

      <!-- Informações Pessoais -->
      <div class="space-y-6 mb-8">
        <h2 class="text-xl font-semibold text-gray-800">
          Informações Pessoais
        </h2>

        <fieldset>
          <label
            for="fullName"
            class="block mb-2 text-sm font-medium text-gray-900"
            >Nome Completo</label
          >
          <input
            type="text"
            id="fullName"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="Digite aqui..."
            v-model="registerUserForm.fullName"
          />
          <p v-if="v$.fullName.$error" class="text-red-600 text-xs">
            <span class="font-normal text-xs">{{
              v$.fullName.$errors ? v$.fullName.$errors[0]?.$message : undefined
            }}</span>
          </p>
        </fieldset>

        <fieldset>
          <label for="cpf" class="block mb-2 text-sm font-medium text-gray-900"
            >CPF</label
          >
          <input
            type="text"
            id="cpf"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="Digite aqui..."
            v-model="registerUserForm.cpf"
            v-maskito="cpfMask"
          />
          <p v-if="v$.cpf.$error" class="text-red-600 text-xs">
            <span class="font-normal text-xs">{{
              v$.cpf.$errors ? v$.cpf.$errors[0]?.$message : undefined
            }}</span>
          </p>
        </fieldset>

        <fieldset>
          <label
            for="birthdate"
            class="block mb-2 text-sm font-medium text-gray-900"
            >Data de Nascimento</label
          >
          <input
            type="date"
            id="birthdate"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="Digite aqui..."
            v-model="registerUserForm.birthDate"
          />
          <p v-if="v$.birthDate.$error" class="text-red-600 text-xs">
            <span class="font-normal text-xs">{{
              v$.birthDate.$errors
                ? v$.birthDate.$errors[0]?.$message
                : undefined
            }}</span>
          </p>
        </fieldset>

        <fieldset>
          <label
            for="phone"
            class="block mb-2 text-sm font-medium text-gray-900"
            >Telefone Celular</label
          >
          <input
            type="text"
            id="phone"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="Digite aqui..."
            v-model="registerUserForm.phone"
            v-maskito="phoneMask"
          />
          <p v-if="v$.phone.$error" class="text-red-600 text-xs">
            <span class="font-normal text-xs">{{
              v$.phone.$errors ? v$.phone.$errors[0]?.$message : undefined
            }}</span>
          </p>
        </fieldset>
      </div>

      <!-- Endereço -->
      <div class="space-y-6 mb-8">
        <h2 class="text-xl font-semibold text-gray-800">Endereço</h2>

        <fieldset>
          <label
            for="postalCode"
            class="block mb-2 text-sm font-medium text-gray-900"
          >
            CEP
          </label>
          <input
            type="text"
            id="postalCode"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="Digite aqui..."
            v-model="registerUserForm.zipCode"
            v-maskito="postalCodeMask"
          />
          <p v-if="v$.zipCode.$error" class="text-red-600 text-xs">
            <span class="font-normal text-xs">{{
              v$.zipCode.$errors ? v$.zipCode.$errors[0]?.$message : undefined
            }}</span>
          </p>
        </fieldset>

        <fieldset>
          <label
            for="street"
            class="block mb-2 text-sm font-medium text-gray-900"
            >Rua</label
          >
          <input
            type="text"
            id="street"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="Digite aqui..."
            readonly
            v-model="registerUserForm.street"
          />
          <p v-if="v$.street.$error" class="text-red-600 text-xs">
            <span class="font-normal text-xs">{{
              v$.street.$errors ? v$.street.$errors[0]?.$message : undefined
            }}</span>
          </p>
        </fieldset>

        <fieldset>
          <label
            for="neighborhood"
            class="block mb-2 text-sm font-medium text-gray-900"
            >Bairro</label
          >
          <input
            type="text"
            id="neighborhood"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="Digite aqui..."
            readonly
            v-model="registerUserForm.neighborhood"
          />
          <p v-if="v$.neighborhood.$error" class="text-red-600 text-xs">
            <span class="font-normal text-xs">{{
              v$.neighborhood.$errors
                ? v$.neighborhood.$errors[0]?.$message
                : undefined
            }}</span>
          </p>
        </fieldset>

        <fieldset>
          <label for="city" class="block mb-2 text-sm font-medium text-gray-900"
            >Cidade</label
          >
          <input
            type="text"
            id="city"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="Digite aqui..."
            readonly
            v-model="registerUserForm.city"
          />
          <p v-if="v$.city.$error" class="text-red-600 text-xs">
            <span class="font-normal text-xs">{{
              v$.city.$errors ? v$.city.$errors[0]?.$message : undefined
            }}</span>
          </p>
        </fieldset>

        <fieldset>
          <label
            for="state"
            class="block mb-2 text-sm font-medium text-gray-900"
            >Estado</label
          >
          <input
            type="text"
            id="state"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="Digite aqui..."
            readonly
            v-model="registerUserForm.state"
          />
          <p v-if="v$.state.$error" class="text-red-600 text-xs">
            <span class="font-normal text-xs">{{
              v$.state.$errors ? v$.state.$errors[0]?.$message : undefined
            }}</span>
          </p>
        </fieldset>
      </div>

      <!-- Informações Financeiras e Carro -->
      <div class="space-y-6 mb-8">
        <h2 class="text-xl font-semibold text-gray-800">
          Informações Financeiras e Carro
        </h2>

        <fieldset>
          <label
            for="monthlyIncome"
            class="block mb-2 text-sm font-medium text-gray-900"
            >Renda Mensal</label
          >
          <input
            type="text"
            id="monthlyIncome"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="Digite aqui..."
            v-model.lazy="registerUserForm.monthlyIncome"
            v-money3="selectedCurrencyConfig"
          />
          <p v-if="v$.monthlyIncome.$error" class="text-red-600 text-xs">
            <span class="font-normal text-xs">{{
              v$.monthlyIncome.$errors
                ? v$.monthlyIncome.$errors[0]?.$message
                : undefined
            }}</span>
          </p>
        </fieldset>

        <fieldset>
          <label class="block text-sm font-medium text-gray-700"
            >Possui Carro</label
          >
          <div class="flex items-center mt-1 space-x-4">
            <div>
              <input
                v-model="registerUserForm.hasCar"
                type="radio"
                id="hasCarYes"
                :value="true"
                class="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <label for="hasCarYes" class="ml-2 text-sm text-gray-900"
                >Sim</label
              >
            </div>
            <div>
              <input
                v-model="registerUserForm.hasCar"
                type="radio"
                id="hasCarNo"
                :value="false"
                class="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <label for="hasCarNo" class="ml-2 text-sm text-gray-900"
                >Não
              </label>
            </div>
            <a
              role="button"
              class="block text-sm text-indigo-600 hover:text-indigo-800"
              @click="isModalOpen = true"
            >
              Por que precisamos desta informação?
            </a>
          </div>
          <p v-if="v$.hasCar.$error" class="text-red-600 text-xs">
            <span class="font-normal text-xs">{{
              v$.hasCar.$errors ? v$.hasCar.$errors[0]?.$message : undefined
            }}</span>
          </p>
        </fieldset>
      </div>

      <!-- Informações sobre o Pet -->
      <div class="space-y-6 mb-8">
        <h2 class="text-xl font-semibold text-gray-800">Informações do Pet</h2>

        <fieldset>
          <label
            for="petSpecies"
            class="block mb-2 text-sm font-medium text-gray-900"
          >
            Espécie do Pet
          </label>

          <SelectPetSpecies
            v-model="registerUserForm.petSpecies"
            @update:value="(value: PetSpecies) => registerUserForm.petSpecies = value"
          />
          <p v-if="v$.petSpecies.$error" class="text-red-600 text-xs">
            <span class="font-normal text-xs">{{
              v$.petSpecies.$errors
                ? v$.petSpecies.$errors[0]?.$message
                : undefined
            }}</span>
          </p>
        </fieldset>

        <fieldset>
          <label
            for="petBreed"
            class="block mb-2 text-sm font-medium text-gray-900"
          >
            Raça do Pet
          </label>
          <SelectPetBreed
            :pet-breeds="petBreeds"
            v-model="registerUserForm.petBreed"
            @update:value="(value: string) => registerUserForm.petBreed = value"
          />
          <p v-if="v$.petBreed.$error" class="text-red-600 text-xs">
            <span class="font-normal text-xs">{{
              v$.petBreed.$errors ? v$.petBreed.$errors[0]?.$message : undefined
            }}</span>
          </p>
        </fieldset>

        <fieldset v-if="registerUserForm.petBreed == 'Outro'">
          <label
            for="petOtherBreed"
            class="block mb-2 text-sm font-medium text-gray-900"
          >
            Nome da Raça do Pet
          </label>
          <input
            type="text"
            id="petOtherBreed"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="Digite aqui..."
            v-model="registerUserForm.petOtherBreed"
          />
          <p v-if="v$.petOtherBreed.$error" class="text-red-600 text-xs">
            <span class="font-normal text-xs">{{
              v$.petOtherBreed.$errors
                ? v$.petOtherBreed.$errors[0]?.$message
                : undefined
            }}</span>
          </p>
        </fieldset>
      </div>

      <!-- Botão de Submit -->
      <div>
        <button
          type="submit"
          class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Criar usuário
        </button>
      </div>
    </form>

    <!-- Modal -->
    <TransitionRoot as="template" :show="isModalOpen">
      <Dialog
        as="div"
        class="fixed z-10 inset-0 overflow-y-auto"
        @close="closeModal"
      >
        <div
          class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogOverlay
              class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-[-1]"
            />
          </TransitionChild>

          <span class="hidden sm:inline-block sm:align-middle sm:h-screen"
            >&#8203;
          </span>
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transregisterUserForm transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
            >
              <div class="mt-3 text-center sm:mt-5">
                <DialogTitle
                  as="h3"
                  class="text-lg leading-6 font-medium text-gray-900"
                >
                  Por que precisamos desta informação?
                </DialogTitle>

                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              </div>

              <div class="mt-5 sm:mt-6">
                <button
                  type="button"
                  class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700"
                  @click="closeModal"
                >
                  Entendi
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Modal de Sucesso -->
    <TransitionRoot as="template" :show="isModalSuccessOpen">
      <Dialog
        as="div"
        class="fixed z-10 inset-0 overflow-y-auto"
        @close="closeModal"
      >
        <div
          class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogOverlay
              class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-[-1]"
            />
          </TransitionChild>

          <span class="hidden sm:inline-block sm:align-middle sm:h-screen"
            >&#8203;</span
          >

          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
            >
              <div class="flex items-center mb-4">
                <CheckCircleIcon class="h-6 w-6 text-green-500" />

                <DialogTitle
                  as="h3"
                  class="text-lg leading-6 font-medium text-gray-900"
                >
                  Sucesso! Dados cadastrados corretamente.
                </DialogTitle>
              </div>

              <div class="space-y-4 text-sm text-gray-500">
                <div class="flex justify-between">
                  <span class="font-semibold">Nome Completo:</span>
                  <span>{{ registerUserForm.fullName }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-semibold">CPF:</span>
                  <span>{{ registerUserForm.cpf }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-semibold">Data de Nascimento:</span>
                  <span>{{ registerUserForm.birthDate }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-semibold">Telefone:</span>
                  <span>{{ registerUserForm.phone }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-semibold">CEP:</span>
                  <span>{{ registerUserForm.zipCode }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-semibold">Rua:</span>
                  <span>{{ registerUserForm.street }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-semibold">Bairro:</span>
                  <span>{{ registerUserForm.neighborhood }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-semibold">Cidade:</span>
                  <span>{{ registerUserForm.city }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-semibold">Estado:</span>
                  <span>{{ registerUserForm.state }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-semibold">Renda Mensal:</span>
                  <span>{{ registerUserForm.monthlyIncome }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-semibold">Possui Carro:</span>
                  <span>{{ registerUserForm.hasCar ? "Sim" : "Não" }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-semibold">Espécie do Pet:</span>
                  <span>{{ registerUserForm.petSpecies }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-semibold">Raça do Pet:</span>
                  <span>{{ registerUserForm.petBreed }}</span>
                </div>
                <div
                  v-if="registerUserForm.petBreed === 'Outro'"
                  class="flex justify-between"
                >
                  <span class="font-semibold">Nome da Raça do Pet:</span>
                  <span>{{ registerUserForm.petOtherBreed }}</span>
                </div>
              </div>

              <div class="mt-5 sm:mt-6">
                <button
                  type="button"
                  class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700"
                  @click="closeSuccessModal()"
                >
                  Fechar
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";

import { unformat } from "v-money3";

import { currencyConfigs } from "@/shared/utils/currencyConfig";
import { postalCodeMask, phoneMask, cpfMask } from "@/shared/mask/mask";

import useVuelidate from "@vuelidate/core";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

import { CheckCircleIcon } from "@heroicons/vue/20/solid";

import { PetSpecies } from "@/enums/PetSpecies";

export default defineComponent({
  name: "IndexPage",
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    CheckCircleIcon,
  },
  setup() {
    const { getAddressByPostalCode } = useAddress();
    const { registerUserFormRules, registerUserForm, registerUser } = useUser();

    const selectedCurrencyConfig = ref(currencyConfigs.BRL);

    const petBreeds = ref<string[]>([]);

    const isModalOpen = ref(false);
    const isModalSuccessOpen = ref(false);

    const fetchAddress = async () => {
      const address = await getAddressByPostalCode(
        registerUserForm.value.zipCode.replace("-", "")
      );

      registerUserForm.value.neighborhood = address?.bairro ?? "";
      registerUserForm.value.city = address?.localidade ?? "";
      registerUserForm.value.state = address?.uf ?? "";
      registerUserForm.value.street = address?.logradouro ?? "";
    };

    const openModal = () => {
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    const closeSuccessModal = () => {
      isModalSuccessOpen.value = false;
      navigateTo("/");
    };

    const handleSubmit = async () => {
      try {
        registerUserForm.value.monthlyIncome = unformat(
          registerUserForm.value.monthlyIncome.toString(),
          selectedCurrencyConfig.value
        );

        const result = await v$.value.$validate();

        if (!result) return;

        const response = await registerUser(registerUserForm.value);

        if (response) {
          isModalSuccessOpen.value = true;
        }
      } catch (e) {
        console.error(e);
      }
    };

    watch(
      () => registerUserForm.value.zipCode,
      (newVal) => {
        if (newVal.length === 9) fetchAddress();
      }
    );

    watch(
      () => registerUserForm.value.petSpecies,
      (newVal) => {
        if (newVal === PetSpecies.Dog || newVal === "Cão") {
          petBreeds.value = [
            "Labrador",
            "Golden Retriever",
            "Bulldog",
            "Beagle",
            "Poodle",
            "Outro",
          ];

          registerUserForm.value.petBreed = "";
        } else if (newVal === PetSpecies.Cat || newVal === "Gato") {
          petBreeds.value = [
            "Persa",
            "Siamês",
            "Maine Coon",
            "Bengal",
            "Sphynx",
            "Outro",
          ];

          registerUserForm.value.petBreed = "";
        } else {
          petBreeds.value = [];
        }
      }
    );

    const v$ = useVuelidate(registerUserFormRules, registerUserForm);

    return {
      phoneMask,
      cpfMask,
      postalCodeMask,
      PetSpecies,
      v$,
      selectedCurrencyConfig,
      registerUserForm,
      petBreeds,
      isModalOpen,
      isModalSuccessOpen,
      fetchAddress,
      openModal,
      closeModal,
      closeSuccessModal,
      handleSubmit,
    };
  },
});
</script>
