import categoriesData from '../mock/categories.json'
import lettersData from '../mock/letters.json'
import namesData from '../mock/names.json'
import type { FilterGroup, Gender, PetName } from '../types/pet'

export const ALPHABET = lettersData.data as readonly string[]

export type AlphabetLetter = (typeof ALPHABET)[number]

export const FILTER_GROUPS = categoriesData.filterGroups as FilterGroup[]

const names = namesData.data as PetName[]

function matchesGender(name: PetName, gender: Gender) {
  if (gender === 'both') {
    return true
  }

  if (gender === 'male') {
    return name.gender.includes('M')
  }

  return name.gender.includes('F')
}

function matchesLetter(name: PetName, letter: AlphabetLetter) {
  return name.title.charAt(0).toUpperCase() === letter
}

function matchesCategoryFilters(name: PetName, selectedCategoryIds: string[]) {
  if (selectedCategoryIds.length === 0) {
    return true
  }

  return name.categories.some((categoryId) => selectedCategoryIds.includes(categoryId))
}

export function filterNames({
  letter,
  gender,
  selectedCategoryIds,
}: {
  letter: AlphabetLetter | null
  gender: Gender
  selectedCategoryIds: string[]
}) {
  return names
    .filter((name) => {
      if (letter && !matchesLetter(name, letter)) {
        return false
      }

      if (!matchesGender(name, gender)) {
        return false
      }

      return matchesCategoryFilters(name, selectedCategoryIds)
    })
    .sort((left, right) => left.title.localeCompare(right.title))
}
