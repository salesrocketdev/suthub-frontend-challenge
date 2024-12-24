<template>
  <div class="mt-4 flex justify-between items-center">
    <!-- Select Limit -->
    <div class="hidden md:flex items-center space-x-2">
      <label for="limit" class="text-sm">Itens por página:</label>

      <Combobox v-model="selectedLimit">
        <div class="relative mt-1">
          <div
            class="relative w-full border cursor-default overflow-hidden rounded-lg bg-white text-left shadow-none outline-none sm:text-sm"
          >
            <ComboboxInput
              class="w-28 px-4 py-2 text-sm border-gray-300 rounded-md outline-none"
              placeholder="Selecionar"
              :display-value="() => `${selectedLimit.toString()} itens`"
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
          >
            <ComboboxOptions
              class="absolute mt-1 max-h-30 w-28 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
            >
              <ComboboxOption
                v-for="(tag, index) in limits"
                as="template"
                :key="index"
                :value="tag"
                v-slot="{ selected, active }"
              >
                <li
                  class="relative cursor-default select-none py-2 pl-10 pr-4"
                  :class="{
                    'bg-teal-600 text-white': active,
                    'text-gray-900': !active,
                  }"
                >
                  <span
                    class="block truncate"
                    :class="{
                      'font-medium': selected,
                      'font-normal': !selected,
                    }"
                  >
                    {{ tag }}
                  </span>

                  <span
                    v-if="selected"
                    class="absolute inset-y-0 left-0 flex items-center pl-3"
                    :class="{ 'text-white': active, 'text-teal-600': !active }"
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

    <!-- Page Counter -->
    <div class="flex items-center">
      <span class="text-sm">
        Página {{ pagination.page }} de {{ pagination.total }}
      </span>
    </div>

    <!-- Buttons -->
    <div class="flex space-x-2 ml-24">
      <button
        title="Clique para voltar para a página anterior"
        v-bind:disabled="pagination.page === 1"
        @click="handleUpdatePageProps(pagination.page - 1)"
        class="px-2 py-2 rounded-md text-sm flex items-center justify-center"
        :class="{
          'bg-gray-200 text-gray-700': pagination.page !== 1,
          'bg-gray-300 text-gray-500 cursor-not-allowed': pagination.page === 1,
          '!bg-gray-400 text-white': pagination.page !== 1,
        }"
      >
        <ChevronLeftIcon class="w-5 h-5" />
      </button>

      <button
        title="Clique para avançar para a próxima página"
        v-bind:disabled="pagination.page === pagination.total"
        @click="handleUpdatePageProps(pagination.page + 1)"
        class="px-2 py-2 rounded-md text-sm flex items-center justify-center"
        :class="{
          'bg-gray-200 text-gray-700': pagination.page !== pagination.total,
          'bg-gray-300 text-gray-500 cursor-not-allowed':
            pagination.page === pagination.total,
          '!bg-gray-400 text-white': pagination.page !== pagination.total,
        }"
      >
        <ChevronRightIcon class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from "@headlessui/vue";

import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpDownIcon,
} from "@heroicons/vue/20/solid";

import type { ITablePaginationProps } from "@/interfaces/props/ITablePaginationProps";

export default defineComponent({
  name: "TablePagination",
  components: {
    Combobox,
    ComboboxInput,
    ComboboxButton,
    ComboboxOptions,
    ComboboxOption,
    TransitionRoot,
    CheckIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronUpDownIcon,
  },
  props: {
    value: {
      type: Object as PropType<ITablePaginationProps>,
      required: true,
    },
  },
  emits: ["update:value"],
  setup(props, { emit }) {
    const pagination = ref(props.value);

    const selectedLimit = ref(props.value.limit);
    const limits = [5, 10, 20, 50, 100];

    watch(props.value, (newValue) => {
      pagination.value = newValue;
      selectedLimit.value = newValue.limit;
    });

    watch(selectedLimit, (newValue) => {
      pagination.value.limit = newValue;

      const updatedPagination = pagination.value;
      emit("update:value", updatedPagination);
    });

    const handleUpdatePageProps = (page: number) => {
      if (page) {
        pagination.value.page = page;
        pagination.value.limit = selectedLimit.value;

        const updatedPagination = pagination.value;
        emit("update:value", updatedPagination);
      }
    };

    return {
      selectedLimit,
      limits,
      handleUpdatePageProps,
      pagination,
    };
  },
});
</script>
