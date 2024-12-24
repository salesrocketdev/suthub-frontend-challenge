<template>
  <div class="w-full md:w-auto">
    <Combobox
      v-model="selectedTag"
      :multiple="true"
      @update:model-value="updateValue()"
    >
      <div class="relative mt-1">
        <div
          class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
        >
          <ComboboxInput
            class="w-full border-none outline-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900"
            @input="onInput"
            placeholder="Procurando por tags..."
            :display-value="() => selectedTag.join(', ')"
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
              v-if="filteredTags.length === 0 && query !== ''"
              class="relative cursor-default select-none px-4 py-2 text-gray-700"
            >
              Tag '{{ query }}' não encontrada
            </div>

            <ComboboxOption
              v-for="(tag, index) in filteredTags"
              as="template"
              :key="index"
              :value="tag"
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
                  {{ tag }}
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
import { defineComponent, ref, computed, onMounted } from "vue";

import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from "@headlessui/vue";

import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";

import { useRecipe } from "@/composables/useRecipe";

export default defineComponent({
  name: "SelectRecipeTags",
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
    const { recipeTags, getAllRecipeTags } = useRecipe();

    const selectedTag = ref([]);
    const query = ref("");

    const filteredTags = computed(() => {
      const queryString = String(query.value).toLowerCase();

      return queryString === ""
        ? recipeTags.value
        : recipeTags.value.filter((tag) =>
            tag.toString().toLowerCase().includes(queryString)
          );
    });

    const fetchRecipeTagsData = async () => {
      try {
        await getAllRecipeTags();
      } catch (error) {
        console.error("Erro ao buscar dados de tags de receitas:", error);
      }
    };

    const onInput = (event: Event) => {
      query.value = (event.target as HTMLInputElement).value;
    };

    const updateValue = () => {
      emit("update:value", selectedTag.value);
    };

    onMounted(async () => {
      await fetchRecipeTagsData();
    });

    return {
      selectedTag,
      query,
      filteredTags,
      onInput,
      updateValue,
    };
  },
});
</script>
