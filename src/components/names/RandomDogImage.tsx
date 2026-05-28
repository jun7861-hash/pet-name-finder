import { useRandomDogImage } from '../../hooks/useRandomDogImage'

interface RandomDogImageProps {
  refreshKey: string
  onClick?: () => void
}

export function RandomDogImage({ refreshKey, onClick }: RandomDogImageProps) {
  const { imageUrl, isLoading, error } = useRandomDogImage(refreshKey)

  if (isLoading) {
    return (
      <div className="flex h-[320px] w-[280px] shrink-0 items-center justify-center">
        <span className="text-dark-mid">Loading...</span>
      </div>
    )
  }

  if (error || !imageUrl) {
    return (
      <div className="flex h-[320px] w-[280px] shrink-0 items-center justify-center">
        <span className="text-dark-mid">Could not load image</span>
      </div>
    )
  }

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label="View name details"
        className="cursor-pointer rounded-md transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main"
      >
        <img
          src={imageUrl}
          alt="Random dog"
          className="h-auto max-h-[360px] w-[280px] shrink-0 object-contain"
        />
      </button>
    )
  }

  return (
    <img
      src={imageUrl}
      alt="Random dog"
      className="h-auto max-h-[360px] w-[280px] shrink-0 object-contain"
    />
  )
}
