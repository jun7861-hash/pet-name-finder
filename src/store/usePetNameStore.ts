import { create } from 'zustand'
import type { AlphabetLetter } from '../constants/alphabet'
import type { FilterKey, Gender } from '../types/pet'

interface PetNameState {
  gender: Gender
  selectedLetter: AlphabetLetter | null
  openFilter: FilterKey | null
  selectedCategoryIds: string[]
  setGender: (gender: Gender) => void
  setSelectedLetter: (letter: AlphabetLetter) => void
  toggleFilter: (filter: FilterKey) => void
  toggleCategory: (categoryId: string) => void
}

export const initialPetNameState = {
  gender: 'male' as Gender,
  selectedLetter: null as AlphabetLetter | null,
  openFilter: null as FilterKey | null,
  selectedCategoryIds: [] as string[],
}

export const usePetNameStore = create<PetNameState>((set) => ({
  ...initialPetNameState,
  setGender: (gender) => set({ gender }),
  setSelectedLetter: (letter) => set({ selectedLetter: letter }),
  toggleFilter: (filter) =>
    set((state) => ({
      openFilter: state.openFilter === filter ? null : filter,
    })),
  toggleCategory: (categoryId) =>
    set((state) => ({
      selectedCategoryIds: state.selectedCategoryIds.includes(categoryId)
        ? state.selectedCategoryIds.filter((id) => id !== categoryId)
        : [...state.selectedCategoryIds, categoryId],
    })),
}))
