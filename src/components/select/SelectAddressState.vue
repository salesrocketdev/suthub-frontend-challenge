<template>
  <div class="w-full md:w-auto border-red-300">
    <Combobox v-model="selectedState" @update:model-value="updateValue">
      <div class="relative mt-1 border-red-300">
        <div
          class="relative w-full cursor-default overflow-hidden rounded-lg text-left shadow-none sm:text-sm"
        >
          <ComboboxInput
            class="w-full border border-gray-300 bg-transparent p-2.5 text-sm rounded-lg text-gray-900"
            @input="onInput"
            placeholder="Selecione um estado..."
            :display-value="() => selectedState"
          />

          <ComboboxButton
            class="absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <ChevronUpDownIcon
              class="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </ComboboxButton>
        </div>

        <TransitionRoot
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          @after-leave="query = ''"
        >
          <ComboboxOptions
            class="absolute mt-1 max-h-60 w-full z-20 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
          >
            <div
              v-if="filteredStates.length === 0 && query !== ''"
              class="relative cursor-default select-none px-4 py-2 text-gray-700"
            >
              Estado '{{ query }}' não encontrado
            </div>

            <ComboboxOption
              v-for="(state, index) in filteredStates"
              as="template"
              :key="index"
              :value="state.sigla"
              v-slot="{ selected, active }"
            >
              <li
                class="relative cursor-default select-none py-2 pl-10 pr-4"
                :class="{
                  'bg-indigo-600 text-white': active,
                  'text-gray-900': !active,
                }"
              >
                <span
                  class="block truncate"
                  :class="{ 'font-medium': selected, 'font-normal': !selected }"
                >
                  {{ state.nome }}
                </span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3"
                  :class="{ 'text-white': active, 'text-indigo-600': !active }"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ComboboxOption>
          </ComboboxOptions>
        </TransitionRoot>
      </div>
    </Combobox>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";

import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from "@headlessui/vue";

import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";

export default defineComponent({
  name: "SelectState",
  emits: ["update:value"],
  components: {
    Combobox,
    ComboboxInput,
    ComboboxButton,
    ComboboxOptions,
    ComboboxOption,
    TransitionRoot,
    CheckIcon,
    ChevronUpDownIcon,
  },
  setup(props, { emit }) {
    const states = ref([
      { nome: "Acre", sigla: "AC" },
      { nome: "Alagoas", sigla: "AL" },
      { nome: "Amapá", sigla: "AP" },
      { nome: "Amazonas", sigla: "AM" },
      { nome: "Bahia", sigla: "BA" },
      { nome: "Ceará", sigla: "CE" },
      { nome: "Distrito Federal", sigla: "DF" },
      { nome: "Espírito Santo", sigla: "ES" },
      { nome: "Goiás", sigla: "GO" },
      { nome: "Maranhão", sigla: "MA" },
      { nome: "Mato Grosso", sigla: "MT" },
      { nome: "Mato Grosso do Sul", sigla: "MS" },
      { nome: "Minas Gerais", sigla: "MG" },
      { nome: "Pará", sigla: "PA" },
      { nome: "Paraíba", sigla: "PB" },
      { nome: "Paraná", sigla: "PR" },
      { nome: "Pernambuco", sigla: "PE" },
      { nome: "Piauí", sigla: "PI" },
      { nome: "Rio de Janeiro", sigla: "RJ" },
      { nome: "Rio Grande do Norte", sigla: "RN" },
      { nome: "Rio Grande do Sul", sigla: "RS" },
      { nome: "Rondônia", sigla: "RO" },
      { nome: "Roraima", sigla: "RR" },
      { nome: "Santa Catarina", sigla: "SC" },
      { nome: "São Paulo", sigla: "SP" },
      { nome: "Sergipe", sigla: "SE" },
      { nome: "Tocantins", sigla: "TO" },
    ]);

    const selectedState = ref<string>("");
    const query = ref("");

    const filteredStates = computed(() => {
      const queryString = String(query.value).toLowerCase();
      return queryString === ""
        ? states.value
        : states.value.filter((state) =>
            state.nome.toLowerCase().includes(queryString)
          );
    });

    const onInput = (event: Event) => {
      query.value = (event.target as HTMLInputElement).value;
    };

    const updateValue = () => {
      emit("update:value", selectedState.value);
    };

    return {
      states,
      selectedState,
      query,
      filteredStates,
      onInput,
      updateValue,
    };
  },
});
</script>
