export type Gender = 'male' | 'female' | 'both'

export type FilterKey =
  | 'famous'
  | 'pets-size'
  | 'joyful'
  | 'funny'
  | 'food-and-drinks'
  | 'international'
  | 'others'

export type PetGenderCode = 'M' | 'F'

export interface PetName {
  id: string
  title: string
  definition: string
  gender: PetGenderCode[]
  categories: string[]
}

export interface FilterGroup {
  id: FilterKey
  label: string
  categoryIds: string[]
}
