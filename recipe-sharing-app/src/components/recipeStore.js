// src/recipeStore.js
import { create } from 'zustand';

export const useRecipeStore = create((set) => ({
  recipes: [],
  favorites: [],
  
  // Add this function!
  setRecipes: (newRecipes) => set({ recipes: newRecipes }),

  addRecipe: (recipe) => set((state) => ({
    recipes: [...state.recipes, recipe]
  })),

  editRecipe: (updatedRecipe) => set((state) => ({
    recipes: state.recipes.map((r) =>
      r.id === updatedRecipe.id ? updatedRecipe : r
    )
  })),

  deleteRecipe: (id) => set((state) => ({
    recipes: state.recipes.filter((r) => r.id !== id)
  })),

  toggleFavorite: (id) => set((state) => {
    const isFavorite = state.favorites.includes(id);
    return {
      favorites: isFavorite
        ? state.favorites.filter((fid) => fid !== id)
        : [...state.favorites, id],
    };
  }),
}));
