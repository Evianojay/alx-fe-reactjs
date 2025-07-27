import { create } from 'zustand';

export const useRecipeStore = create((set) => ({
  recipes: [],
  selectedRecipe: null,
  searchQuery: '',
  addRecipe: (recipe) =>
    set((state) => ({ recipes: [...state.recipes, recipe] })),
  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== id),
    })),
  updateRecipe: (updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((r) =>
        r.id === updatedRecipe.id ? updatedRecipe : r
      ),
    })),
  selectRecipe: (recipe) => set({ selectedRecipe: recipe }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
