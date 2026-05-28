import categoriesData from '../mock/categories.json'
import type { FilterKey } from '../types/pet'
import { FILTER_GROUPS } from './filterNames'

export const CATEGORIES = categoriesData.data as {
  id: string
  name: string
  description: string | null
}[]

export function getCategoryName(categoryId: string): string {
  return CATEGORIES.find((category) => category.id === categoryId)?.name ?? categoryId
}

export function getCategoriesForFilterGroup(filterKey: FilterKey) {
  const group = FILTER_GROUPS.find((item) => item.id === filterKey)
  if (!group) {
    return []
  }

  return group.categoryIds.map((id) => ({
    id,
    name: getCategoryName(id),
  }))
}
