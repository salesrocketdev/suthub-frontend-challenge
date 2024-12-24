<template>
  <div class="container mx-auto p-4">
    <!-- Campo de busca -->
    <div class="">
      <div class="flex flex-wrap justify-between items-center pb-4">
        <h1 class="text-2xl font-bold text-gray-800">Galeria de receitas</h1>

        <SelectRecipeTags
          v-model="selectedTags"
          @update:value="(selectedTags: string[]) => handleSearchRecipesByTags(selectedTags)"
        />
      </div>

      <div
        v-if="selectedTags.length > 0"
        class="flex justify-between items-center gap-2 text-gray-400 mb-2"
      >
        <span class="text-xs">
          Filtrando por: {{ selectedTags.join(", ") }}
        </span>

        <div>
          <span class="text-xs pr-1">
            {{ recipes.length }} receitas encontradas
          </span>

          <button
            title="Limpar filtros"
            class="text-xs rounded-lg bg-indigo-600 text-white p-1 hover:bg-indigo-700 hover:text-white transition duration-500 ease-in-out"
            @click="handleSearchRecipesByTags([])"
          >
            Limpar filtros
          </button>
        </div>
      </div>
    </div>

    <!-- Galeria de receitas -->
    <section v-if="isLoadingRecipesInfo">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div
          v-for="n in 10"
          class="rounded overflow-hidden shadow-md flex flex-col animate-pulse"
        >
          <div class="relative">
            <div class="w-full h-48 bg-gray-200"></div>
            <div
              class="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"
            ></div>
            <div
              class="text-xs cursor-default absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 opacity-80 hover:bg-white hover:opacity-100 hover:text-indigo-600 transition duration-500 ease-in-out"
            >
              <div class="w-full h-4 bg-indigo-600"></div>
            </div>
          </div>

          <div class="px-4 py-4 mb-auto">
            <div
              class="font-medium text-sm hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2"
            >
              <div class="w-full h-4 bg-gray-200 rounded"></div>
            </div>
            <div class="flex flex-wrap gap-2 mb-2">
              <div
                class="bg-gray-200 text-gray-700 rounded-full px-2 py-1 text-xs"
              >
                <div class="w-10 h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div class="text-gray-500 text-sm">
              <div class="w-full h-4 bg-gray-200 rounded mt-2"></div>
              <div class="w-2/3 h-4 bg-gray-200 rounded mt-2"></div>
              <div class="w-1/2 h-4 bg-gray-200 rounded mt-2"></div>
            </div>
          </div>

          <div
            class="px-4 py-3 flex flex-row items-center justify-between bg-gray-100"
          >
            <span
              class="py-1 text-xs font-regular text-gray-700 flex flex-row items-center gap-1"
            >
              <div class="w-4 h-4 bg-orange-200 mr-1"></div>
              <div class="w-16 h-4 bg-gray-200 rounded"></div>
            </span>
            <span
              class="py-1 text-xs font-regular text-gray-900 flex flex-row items-center gap-1"
            >
              <div class="w-4 h-4 bg-yellow-200 mr-1"></div>
              <div class="w-6 h-4 bg-gray-200 rounded"></div>
            </span>
          </div>
        </div>
      </div>
    </section>

    <section v-if="!isLoadingRecipesInfo">
      <div
        v-if="recipes.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
      >
        <div
          v-for="recipe in recipes"
          :key="recipe.id"
          class="rounded overflow-hidden shadow-md flex flex-col"
        >
          <div class="relative">
            <a>
              <NuxtImg
                :src="recipe.image"
                alt="Ilustração da receita"
                placeholder
              />

              <div
                class="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"
              ></div>
            </a>

            <div
              class="text-xs cursor-default absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 opacity-80 hover:bg-white hover:opacity-100 hover:text-indigo-600 transition duration-500 ease-in-out"
            >
              {{ recipe.cuisine }}
            </div>
          </div>

          <div class="px-4 py-4 mb-auto">
            <a
              class="font-medium text-sm hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2"
            >
              {{ recipe.name }}
            </a>

            <div class="flex flex-wrap gap-2 mb-2">
              <span
                v-for="tag in recipe.tags.slice(0, 3)"
                :key="tag"
                class="bg-gray-200 text-gray-700 rounded-full px-2 py-1 text-xs"
              >
                {{ tag }}
              </span>
            </div>

            <p class="text-gray-500 text-sm">
              Lorem Ipsum is simply dummy text of the printing and
              typesetting...

              <span
                title="Clique para visualizar os detalhes da receita"
                class="font-medium text-black hover:text-indigo-600 transition duration-500 ease-in-out"
                role="button"
                @click="showRecipeDetails(recipe.id)"
              >
                ver mais
              </span>
            </p>
          </div>

          <div
            class="px-4 py-3 flex flex-row items-center justify-between bg-gray-100"
          >
            <span
              class="py-1 text-xs font-regular text-gray-700 flex flex-row items-center gap-1"
            >
              <ClockIcon class="w-4 h-4 text-orange-500" />

              <span>
                Preparo em
                {{ recipe?.cookTimeMinutes + recipe?.prepTimeMinutes }}
                min.
              </span>
            </span>

            <span
              class="py-1 text-xs font-regular text-gray-900 flex flex-row items-center gap-1"
            >
              <StarIcon class="w-4 h-4 text-yellow-400" />

              <span>(4.9)</span>
            </span>
          </div>
        </div>
      </div>

      <div
        v-else
        class="flex flex-col items-center gap-4 md:mt-40 max-w-md mx-auto"
      >
        <NotFoundAnimation />

        <span class="text-lg text-gray-600 font-semibold text-center">
          Ops! Não encontramos nenhuma receita com as tags selecionadas.
        </span>

        <p class="text-sm text-gray-500 text-center">
          Parece que não há receitas disponíveis para as tags que você escolheu.
          Que tal tentar novas combinações ou buscar por tags diferentes? Às
          vezes, um pequeno ajuste pode abrir muitas opções deliciosas para
          você.
        </p>

        <p class="text-sm text-gray-500 text-center">
          Se precisar de ajuda para encontrar receitas, explore tags mais
          populares ou veja sugestões para começar sua busca.
        </p>
      </div>
    </section>

    <div v-if="selectedTags.length == 0">
      <!-- Paginação -->
      <TablePagination
        v-if="!isLoadingRecipesInfo && recipes.length > 0"
        :value="pagination"
        @update:value="handleUpdatePageProps($event)"
      />
    </div>

    <!-- Modal de detalhes da receita -->
    <TransitionRoot appear :show="isModalRecipeDetailsOpen" as="template">
      <Dialog as="div" class="relative z-10">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div v-if="selectedRecipe?.id" class="fixed inset-0 overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center p-4 text-center"
          >
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full transform rounded-2xl bg-white text-left align-middle shadow-xl transition-all"
              >
                <div
                  class="flex flex-row mx-auto bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <NuxtImg
                    :src="selectedRecipe.image"
                    fit="fill"
                    alt="Ilustração da receita"
                    placeholder
                  />

                  <div class="w-full p-4">
                    <div class="flex justify-between">
                      <h2 class="text-lg font-semibold text-gray-800">
                        {{ selectedRecipe.name }}
                      </h2>

                      <div
                        title="Clique para fechar o modal"
                        class="cursor-pointer hover:text-indigo-600 transition duration-500 ease-in-out"
                        @click="closeModal()"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16px"
                          height="16px"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
                            fill="#0F1729"
                          />
                        </svg>
                      </div>
                    </div>

                    <p class="text-sm text-gray-500">
                      {{ selectedRecipe.mealType.join(", ") }}
                    </p>

                    <div
                      class="flex items-center text-sm text-gray-600 mt-2 gap-2"
                    >
                      <div class="flex items-center">
                        <span
                          class="py-1 text-xs font-regular text-gray-700 flex flex-row items-center gap-1"
                        >
                          <UserIcon class="w-4 h-4 text-indigo-600" />

                          <span>
                            Serve até {{ selectedRecipe.servings }} pessoas
                          </span>
                        </span>
                      </div>

                      <div class="flex items-center">
                        <span
                          class="py-1 text-xs font-regular text-gray-700 flex flex-row items-center gap-1"
                        >
                          <ClockIcon class="w-4 h-4 text-orange-500" />

                          <span>
                            Tempo total de preparo em
                            {{
                              selectedRecipe?.cookTimeMinutes +
                              selectedRecipe?.prepTimeMinutes
                            }}
                            minutos
                          </span>
                        </span>
                      </div>
                    </div>

                    <div class="flex flex-wrap gap-2 mt-2">
                      <span
                        v-for="tag in selectedRecipe.tags.slice(0, 3)"
                        :key="tag"
                        class="bg-gray-200 text-gray-700 rounded-full px-2 py-1 text-xs"
                      >
                        {{ tag }}
                      </span>
                    </div>

                    <p class="mt-2 text-gray-800 font-medium">
                      Instruções de preparo:
                    </p>
                    <ol>
                      <li
                        class="text-sm text-gray-600"
                        v-for="(
                          instruction, index
                        ) in selectedRecipe.instructions"
                        :key="instruction"
                      >
                        {{ index + 1 }} - {{ instruction }}
                      </li>
                    </ol>

                    <p class="mt-2 text-gray-800 font-medium">Ingredientes:</p>
                    <ol>
                      <li
                        class="text-sm text-gray-600"
                        v-for="(
                          ingredient, index
                        ) in selectedRecipe.ingredients"
                        :key="ingredient"
                      >
                        {{ index + 1 }} - {{ ingredient }}
                      </li>
                    </ol>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

import { useRecipe } from "@/composables/useRecipe";

import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

import { StarIcon, ClockIcon, UserIcon } from "@heroicons/vue/20/solid";

import TablePagination from "@/components/layout/TablePagination.vue";

import SelectRecipeTags from "@/components/select/SelectRecipeTags.vue";

import NotFoundAnimation from "@/components/layout/animation/NotFoundAnimation.vue";

import type { ITablePaginationProps } from "@/interfaces/props/ITablePaginationProps";
import type { Recipe } from "@/interfaces/entities/Recipe";

export default defineComponent({
  name: "RecipesGalleryPage",
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
    SelectRecipeTags,
    StarIcon,
    ClockIcon,
    UserIcon,
    NotFoundAnimation,
    TablePagination,
  },
  setup() {
    useHead({
      title: "SUTHUB - Receitas",
      meta: [
        {
          name: "description",
          content: "Página de receitas do desafio SUTHUB.",
        },
      ],
      htmlAttrs: {
        lang: "pt-br",
      },
    });

    const {
      pagination,
      recipes,
      getAllRecipes,
      searchRecipesByTags,
      getRecipeById,
    } = useRecipe();

    const searchQuery = ref("");
    const selectedTags = ref<string[]>([]);
    const tags = ref<string[]>(["Asian", "Chicken", "Dessert", "Vegetarian"]); // Mock tags

    const selectedRecipe = ref<Recipe | null>();

    const isLoadingRecipesInfo = ref(true);
    const isModalRecipeDetailsOpen = ref(false);

    const fetchRecipesData = async () => {
      try {
        isLoadingRecipesInfo.value = true;

        getAllRecipes(
          pagination.value.page ?? 1,
          pagination.value.limit ?? 10
        ).then(() => {
          isLoadingRecipesInfo.value = false;
        });
      } catch (error) {
        console.error("Erro ao buscar dados de receitas:", error);
      }
    };

    const handleSearchRecipesByTags = async (tagsSelected?: string[]) => {
      if (!tagsSelected) tagsSelected = [];
      selectedTags.value = tagsSelected;

      if (selectedTags.value.length > 0) {
        await searchRecipesByTags(selectedTags.value);
      } else {
        await getAllRecipes(pagination.value.page, pagination.value.limit);
      }
    };

    const showRecipeDetails = async (id: number) => {
      const response = await getRecipeById(id);
      if (response) {
        selectedRecipe.value = response;
        isModalRecipeDetailsOpen.value = true;
      }
    };

    const closeModal = () => {
      selectedRecipe.value = null;
      isModalRecipeDetailsOpen.value = false;
    };

    const handleUpdatePageProps = async (
      newPaginationProps: ITablePaginationProps
    ) => {
      pagination.value = newPaginationProps;
      await fetchRecipesData();
    };

    onMounted(async () => {
      await fetchRecipesData();
    });

    return {
      pagination,
      isLoadingRecipesInfo,
      searchQuery,
      selectedTags,
      tags,
      recipes,
      selectedRecipe,
      handleSearchRecipesByTags,
      showRecipeDetails,
      closeModal,
      handleUpdatePageProps,
      isModalRecipeDetailsOpen,
    };
  },
});
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  padding: 20px;
  border-radius: 8px;
}
.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
</style>
