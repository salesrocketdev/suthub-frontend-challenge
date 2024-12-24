import { ref } from "vue";

import { RecipeService } from "@/services";

import type { Recipe } from "@/interfaces/entities/Recipe";
import type { RecipeResponse } from "@/interfaces/responses/RecipeResponse";
import type { RecipesResponse } from "@/interfaces/responses/RecipesResponse";
import type { RecipeTagsResponse } from "@/interfaces/responses/RecipeTagsResponse";

import { MealType } from "@/enums/MealType";

export const useRecipe = () => {
  const recipe = ref<Recipe | null>(null);
  const recipes = ref<Recipe[]>([]);
  const recipeTags = ref<RecipeTagsResponse[]>([]);

  const pagination = ref({ page: 1, limit: 10, total: 0, skip: 0 });

  const getAllRecipes = async (page: number = 1, limit: number = 10) => {
    try {
      const response: RecipesResponse = await RecipeService.GetAllRecipes(
        page,
        limit
      );

      if (!response || response.recipes.length == 0) return [];

      recipes.value = response.recipes;

      pagination.value = {
        page: page,
        limit: response.limit,
        skip: response.skip,
        total: response.total,
      };
    } catch (error) {
      console.error(error);
    }
  };

  const searchRecipesByTags = async (tags: string[]) => {
    try {
      let arr: Recipe[] = [];

      for (const tag of tags) {
        const response = await RecipeService.SearchRecipesByTags(tag);

        if (
          response &&
          Array.isArray(response.recipes) &&
          response.recipes.length > 0
        ) {
          arr.push(...response.recipes);
        }
      }

      recipes.value = arr;
    } catch (error) {
      console.error(error);
    }
  };

  const getRecipeById = async (id: number) => {
    try {
      const response: RecipeResponse = await RecipeService.GetRecipeById(id);

      if (!response) return null;

      recipe.value = response;

      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const getAllRecipeTags = async () => {
    try {
      const response: RecipeTagsResponse[] =
        await RecipeService.GetAllRecipeTags();

      if (!response || response.length == 0) return [];

      recipeTags.value = response
        .slice()
        .sort((a, b) => a.toString().localeCompare(b.toString()));
    } catch (error) {
      console.error(error);
    }
  };

  function mapMealTypeToPtBr(recipe: any) {
    return {
      ...recipe,
      mealType: recipe.mealType.map((type: string) => {
        const mealTypeKey = Object.keys(MealType).find((key) => key === type);
        return mealTypeKey
          ? MealType[mealTypeKey as keyof typeof MealType]
          : type;
      }),
    };
  }

  return {
    recipe,
    recipes,
    recipeTags,
    pagination,
    getAllRecipes,
    searchRecipesByTags,
    getRecipeById,
    getAllRecipeTags,
  };
};
