export interface Recipe {
  id: number;
  name: string;
  image: string;
  cuisine: string;
  tags: string[];
  mealType: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  rating: number;
  servings: number;
  ingredients: string[];
  instructions: string[];
}
