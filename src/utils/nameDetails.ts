import categoriesData from '../mock/categories.json'
import namesData from '../mock/names.json'
import type { PetName } from '../types/pet'
import { FILTER_GROUPS } from './filterNames'

const categories = categoriesData.data as { id: string; name: string }[]
const allNames = namesData.data as PetName[]

export function getNameByTitle(title: string): PetName | undefined {
  return allNames.find((name) => name.title === title)
}

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/\r\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function getCategoryLabel(pet: PetName): string {
  const categoryNames = pet.categories
    .map((id) => categories.find((category) => category.id === id)?.name)
    .filter((name): name is string => Boolean(name))

  const matchingGroups = FILTER_GROUPS.filter((group) =>
    group.categoryIds.some((id) => pet.categories.includes(id)),
  )

  if (matchingGroups.length > 0 && categoryNames.length > 0) {
    return `${matchingGroups[0].label} - ${categoryNames[0]}`
  }

  return categoryNames.join(' - ') || 'General'
}

export function getRelatedNames(pet: PetName, limit = 3): string[] {
  return allNames
    .filter((name) => name.id !== pet.id)
    .filter((name) =>
      name.categories.some((categoryId) => pet.categories.includes(categoryId)),
    )
    .filter(
      (name) =>
        name.title.charAt(0).toUpperCase() === pet.title.charAt(0).toUpperCase(),
    )
    .slice(0, limit)
    .map((name) => name.title)
}

export function getGenderSymbol(genders: PetName['gender']): string {
  if (genders.includes('M') && genders.includes('F')) {
    return '♂'
  }

  if (genders.includes('F')) {
    return '♀'
  }

  return '♂'
}
