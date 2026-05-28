import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { fetchNames } from '../api/namesApi'
import type { AlphabetLetter } from '../constants/alphabet'
import type { Gender, PetName } from '../types/pet'

interface UsePaginatedNamesParams {
  letter: AlphabetLetter
  gender: Gender
  selectedCategoryIds: string[]
}

export function usePaginatedNames({
  letter,
  gender,
  selectedCategoryIds,
}: UsePaginatedNamesParams) {
  const [names, setNames] = useState<PetName[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const requestIdRef = useRef(0)

  const filtersKey = `${letter}-${gender}-${[...selectedCategoryIds].sort().join(',')}`

  useEffect(() => {
    const requestId = ++requestIdRef.current
    const controller = new AbortController()

    async function loadInitialPage() {
      setIsLoading(true)
      setError(null)
      setNames([])
      setPage(1)

      try {
        const response = await fetchNames({
          letter,
          gender,
          selectedCategoryIds,
          page: 1,
        })

        if (requestId !== requestIdRef.current || controller.signal.aborted) {
          return
        }

        setNames(response.data)
        setTotal(response.total)
        setHasMore(response.hasMore)
        setPage(1)
      } catch {
        if (requestId !== requestIdRef.current || controller.signal.aborted) {
          return
        }

        setError('Failed to load names')
        setNames([])
        setTotal(0)
        setHasMore(false)
      } finally {
        if (requestId === requestIdRef.current) {
          setIsLoading(false)
        }
      }
    }

    void loadInitialPage()

    return () => controller.abort()
  }, [filtersKey, letter, gender, selectedCategoryIds])

  const loadMore = useCallback(async () => {
    if (!hasMore || isLoadingMore || isLoading) {
      return
    }

    const nextPage = page + 1
    const requestId = ++requestIdRef.current

    setIsLoadingMore(true)
    setError(null)

    try {
      const response = await fetchNames({
        letter,
        gender,
        selectedCategoryIds,
        page: nextPage,
      })

      if (requestId !== requestIdRef.current) {
        return
      }

      setNames((current) => [...current, ...response.data])
      setTotal(response.total)
      setHasMore(response.hasMore)
      setPage(nextPage)
    } catch {
      if (requestId !== requestIdRef.current) {
        return
      }

      setError('Failed to load more names')
    } finally {
      if (requestId === requestIdRef.current) {
        setIsLoadingMore(false)
      }
    }
  }, [
    gender,
    hasMore,
    isLoading,
    isLoadingMore,
    letter,
    page,
    selectedCategoryIds,
  ])

  const nameTitles = useMemo(() => names.map((name) => name.title), [names])

  return {
    names,
    nameTitles,
    listKey: filtersKey,
    total,
    hasMore,
    isLoading,
    isLoadingMore,
    error,
    loadMore,
  }
}
