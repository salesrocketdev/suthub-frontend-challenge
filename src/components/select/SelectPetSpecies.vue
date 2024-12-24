<template>
  <div>
    <Combobox v-model="selectedSpecie" @update:model-value="updatePetSpecies">
      <div class="relative mt-1 border-gray-300">
        <div
          class="relative w-full cursor-default overflow-hidden rounded-lg text-left shadow-none sm:text-sm"
        >
          <ComboboxInput
            class="w-full border border-gray-300 bg-transparent p-2.5 text-sm rounded-lg text-gray-900"
            @input="onInputPetSpecies"
            placeholder="Selecione a espécie do pet..."
            :display-value="() => selectedSpecie"
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
            <ComboboxOption
              v-for="(species, index) in petSpeciesOptions"
              :key="index"
              :value="species"
            >
              <li class="relative cursor-default select-none py-2 pl-10 pr-4">
                <span class="block truncate">{{ species }}</span>
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
import { ChevronUpDownIcon } from "@heroicons/vue/20/solid";

export default defineComponent({
  name: "SelectPetSpecies",
  components: {
    Combobox,
    ComboboxInput,
    ComboboxButton,
    ComboboxOptions,
    ComboboxOption,
    TransitionRoot,
    ChevronUpDownIcon,
  },
  setup(props, { emit }) {
    const petSpeciesOptions = ["Cão", "Gato"];
    const selectedSpecie = ref<string>("Gato");

    const query = ref("");

    const onInputPetSpecies = (event: Event) => {
      query.value = (event.target as HTMLInputElement).value;
    };

    const filteredPetSpecies = computed(() => {
      const queryString = query.value.toLowerCase();
      return queryString === ""
        ? petSpeciesOptions
        : petSpeciesOptions.filter((species) =>
            species.toLowerCase().includes(queryString)
          );
    });

    const updatePetSpecies = () => {
      emit("update:value", selectedSpecie.value);
    };

    return {
      selectedSpecie,
      petSpeciesOptions,
      query,
      filteredPetSpecies,
      onInputPetSpecies,
      updatePetSpecies,
    };
  },
});
</script>
