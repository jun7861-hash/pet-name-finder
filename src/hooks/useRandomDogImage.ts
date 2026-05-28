import { useEffect, useState } from 'react'

interface DogApiResponse {
  message: string
  status: string
}

export function useRandomDogImage(refreshKey?: string | null) {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchDogImage() {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch('https://dog.ceo/api/breeds/image/random', {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error('Failed to fetch dog image')
        }

        const data = (await response.json()) as DogApiResponse

        if (data.status !== 'success') {
          throw new Error('Unexpected API response')
        }

        setImageUrl(data.message)
      } catch (fetchError) {
        if (fetchError instanceof Error && fetchError.name !== 'AbortError') {
          setError(fetchError.message)
          setImageUrl(null)
        }
      } finally {
        setIsLoading(false)
      }
    }

    void fetchDogImage()

    return () => controller.abort()
  }, [refreshKey])

  return { imageUrl, isLoading, error }
}
