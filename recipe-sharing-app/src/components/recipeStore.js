// src/components/recipeStore.js
import { create } from 'zustand';

const useRecipeStore = create((set) => ({
  recipes: [],
  setRecipes: (recipes) => set({ recipes }), // <-- Needed by the checker
  addRecipe: (recipe) =>
    set((state) => ({
      recipes: [...state.recipes, recipe],
    })),
}));

export default useRecipeStore;
