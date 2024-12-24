import type { Recipe } from "../entities/Recipe";

export interface RecipesResponse {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
}
