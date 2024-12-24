import BaseService from "@/shared/BaseService";

import type { RecipeResponse } from "@/interfaces/responses/RecipeResponse";
import type { RecipesResponse } from "@/interfaces/responses/RecipesResponse";
import type { RecipeTagsResponse } from "@/interfaces/responses/RecipeTagsResponse";

export class RecipeService extends BaseService {
  static async GetAllRecipes(
    page: number = 1,
    limit: number = 10
  ): Promise<RecipesResponse> {
    try {
      const skip = (page - 1) * limit;

      const response = await BaseService.get<RecipesResponse>("recipes", {
        limit,
        skip,
      });

      return response;
    } catch (error) {
      console.error("Error in SearchRecipesByTags:", error);
      throw error;
    }
  }

  static async SearchRecipesByTags(tag: string): Promise<RecipesResponse> {
    try {
      const response = await BaseService.get<RecipesResponse>(
        `recipes/tag/${tag}`
      );

      return response;
    } catch (error) {
      console.error("Error in SearchRecipesByTags:", error);
      throw error;
    }
  }

  static async GetRecipeById(recipeId: number): Promise<RecipeResponse> {
    try {
      const response = await BaseService.get<RecipeResponse>(
        `recipes/${recipeId}`
      );

      return response;
    } catch (error) {
      console.error("Error in GetRecipeById:", error);
      throw error;
    }
  }

  static async GetAllRecipeTags(): Promise<RecipeTagsResponse[]> {
    try {
      const response = await BaseService.get<RecipeTagsResponse[]>(
        "recipes/tags"
      );

      return response;
    } catch (error) {
      console.error("Error in GetAllRecipeTags:", error);
      throw error;
    }
  }
}

export default RecipeService;
