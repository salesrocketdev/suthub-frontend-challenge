<template>
  <Combobox v-model="selectedBreed" @update:model-value="updatePetBreed">
    <div class="relative mt-1 border-gray-300">
      <div
        class="relative w-full cursor-default overflow-hidden rounded-lg text-left shadow-none sm:text-sm"
      >
        <ComboboxInput
          class="w-full border border-gray-300 bg-transparent p-2.5 text-sm rounded-lg text-gray-900"
          @input="onInputPetBreed"
          placeholder="Selecione a raça do pet..."
          :display-value="() => selectedBreed"
        />
        <ComboboxButton
          class="absolute inset-y-0 right-0 flex items-center pr-2"
        >
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
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
            v-for="(breed, index) in petBreeds"
            :key="index"
            :value="breed"
          >
            <li class="relative cursor-default select-none py-2 pl-10 pr-4">
              <span class="block truncate">{{ breed }}</span>
            </li>
          </ComboboxOption>
        </ComboboxOptions>
      </TransitionRoot>
    </div>
  </Combobox>
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
  name: "PetBreedSelect",
  components: {
    Combobox,
    ComboboxInput,
    ComboboxButton,
    ComboboxOptions,
    ComboboxOption,
    TransitionRoot,
    ChevronUpDownIcon,
  },
  props: {
    petBreeds: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    const petBreeds = ref(props.petBreeds);
    const selectedBreed = ref<string>("");

    const query = ref("");

    const onInputPetBreed = (event: Event) => {
      query.value = (event.target as HTMLInputElement).value;
    };

    const updatePetBreed = () => {
      emit("update:value", selectedBreed.value);
    };

    watch(
      () => props.petBreeds,
      (newValue) => {
        petBreeds.value = newValue;
      }
    );

    return {
      selectedBreed,
      petBreeds,
      query,
      onInputPetBreed,
      updatePetBreed,
    };
  },
});
</script>
