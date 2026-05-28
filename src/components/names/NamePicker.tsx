import { useEffect } from 'react'
import { ChevronDownIcon } from '../icons/ChevronDownIcon'
import { ChevronUpIcon } from '../icons/ChevronUpIcon'

interface NamePickerProps {
  names: string[]
  selectedIndex: number
  onSelectedIndexChange: (index: number) => void
  hasMore?: boolean
  isLoadingMore?: boolean
  onLoadMore?: () => void
}

const VISIBLE_OFFSETS = [-3, -2, -1, 0, 1, 2, 3]
const LOAD_MORE_THRESHOLD = 3

function getNameStyles(offset: number) {
  switch (offset) {
    case 0:
      return 'text-[3rem] font-bold leading-none text-main'
    case -1:
    case 1:
      return 'text-2xl font-normal leading-none text-dark-mid/80'
    case -2:
    case 2:
      return 'text-xl font-normal leading-none text-dark-mid/50'
    default:
      return 'text-lg font-normal leading-none text-dark-mid/30'
  }
}

export function NamePicker({
  names,
  selectedIndex,
  onSelectedIndexChange,
  hasMore = false,
  isLoadingMore = false,
  onLoadMore,
}: NamePickerProps) {
  useEffect(() => {
    if (
      !hasMore ||
      isLoadingMore ||
      !onLoadMore ||
      names.length === 0 ||
      selectedIndex < names.length - LOAD_MORE_THRESHOLD
    ) {
      return
    }

    onLoadMore()
  }, [hasMore, isLoadingMore, names.length, onLoadMore, selectedIndex])

  const canScrollUp = selectedIndex > 0
  const canScrollDown = selectedIndex < names.length - 1 || hasMore

  const handleScrollDown = () => {
    if (selectedIndex < names.length - 1) {
      onSelectedIndexChange(selectedIndex + 1)
      return
    }

    if (hasMore && !isLoadingMore) {
      onLoadMore?.()
    }
  }

  return (
    <div className="flex items-center gap-10">
      <div className="flex min-w-[16rem] flex-col items-center gap-6 py-2">
        {VISIBLE_OFFSETS.map((offset) => {
          const nameIndex = selectedIndex + offset
          const name = names[nameIndex]

          if (!name) {
            return <div key={offset} className="h-12 w-full" aria-hidden="true" />
          }

          return (
            <button
              key={`${name}-${nameIndex}`}
              type="button"
              onClick={() => onSelectedIndexChange(nameIndex)}
              className={`w-full text-center transition-colors ${getNameStyles(offset)} ${
                offset === 0 ? 'cursor-default' : 'hover:text-dark'
              }`}
              aria-current={offset === 0 ? 'true' : undefined}
            >
              {name}
            </button>
          )
        })}

        {isLoadingMore && (
          <span className="text-center text-sm text-dark-mid" aria-live="polite">
            Loading more...
          </span>
        )}
      </div>

      <div className="flex flex-col items-center justify-between self-stretch py-1">
        <button
          type="button"
          aria-label="Previous name"
          disabled={!canScrollUp}
          onClick={() => onSelectedIndexChange(Math.max(0, selectedIndex - 1))}
          className="p-2 text-main transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronUpIcon className="h-3 w-3 scale-150" />
        </button>

        <button
          type="button"
          aria-label="Next name"
          disabled={!canScrollDown || isLoadingMore}
          onClick={handleScrollDown}
          className="p-2 text-main transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronDownIcon className="h-3 w-3 scale-150" />
        </button>
      </div>
    </div>
  )
}
