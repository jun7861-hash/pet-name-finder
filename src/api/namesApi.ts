import type { AlphabetLetter } from '../constants/alphabet'
import type { Gender, PetName } from '../types/pet'
import { filterNames } from '../utils/filterNames'

export const NAMES_PAGE_SIZE = 20
const API_DELAY_MS = 400

export interface FetchNamesParams {
  letter: AlphabetLetter
  gender: Gender
  selectedCategoryIds: string[]
  page: number
  pageSize?: number
}

export interface NamesPageResponse {
  data: PetName[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

function delay(ms: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

export async function fetchNames({
  letter,
  gender,
  selectedCategoryIds,
  page,
  pageSize = NAMES_PAGE_SIZE,
}: FetchNamesParams): Promise<NamesPageResponse> {
  await delay(API_DELAY_MS)

  const filtered = filterNames({ letter, gender, selectedCategoryIds })
  const start = (page - 1) * pageSize
  const data = filtered.slice(start, start + pageSize)

  return {
    data,
    total: filtered.length,
    page,
    pageSize,
    hasMore: start + data.length < filtered.length,
  }
}
