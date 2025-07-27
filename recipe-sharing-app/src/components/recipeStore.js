// src/components/recipeStore.js
import { create } from 'zustand';

export const useRecipeStore = create((set) => ({
  recipes: [],
  favorites: [],
  recommendations: [],
  searchTerm: '',

  setRecipes: (newRecipes) => set({ recipes: newRecipes }),
  setFavorites: (favorites) => set({ favorites }),
  setRecommendations: (recommendations) => set({ recommendations }),

  addRecipe: (recipe) =>
    set((state) => ({
      recipes: [...state.recipes, recipe],
    })),

  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((r) => r.id !== id),
      favorites: state.favorites.filter((favId) => favId !== id),
    })),

  updateRecipe: (updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((r) =>
        r.id === updatedRecipe.id ? updatedRecipe : r
      ),
    })),

  toggleFavorite: (id) =>
    set((state) => {
      const isFavorite = state.favorites.includes(id);
      return {
        favorites: isFavorite
          ? state.favorites.filter((favId) => favId !== id)
          : [...state.favorites, id],
      };
    }),

  addFavorite: (id) =>
    set((state) => ({
      favorites: [...new Set([...state.favorites, id])],
    })),

  removeFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.filter((favId) => favId !== id),
    })),

  setSearchTerm: (term) => set({ searchTerm: term }),

  generateRecommendations: () =>
    set((state) => {
      const recommended = state.recipes.filter(
        (r) =>
          state.favorites.includes(r.id) &&
          Math.random() > 0.5 // Simulated logic
      );
      return { recommendations: recommended };
    }),
}));
