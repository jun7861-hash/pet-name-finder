import { ALPHABET, type AlphabetLetter } from '../../constants/alphabet'

interface AlphabetFilterProps {
  value: AlphabetLetter | null
  onChange: (letter: AlphabetLetter) => void
}

export function AlphabetFilter({ value, onChange }: AlphabetFilterProps) {
  return (
    <div className="rounded-full bg-white px-5 py-2 shadow-[0_2px_10px_rgba(58,53,51,0.08)]">
      <div className="flex items-center justify-between gap-1">
        {ALPHABET.map((letter) => {
          const isSelected = value === letter

          return (
            <button
              key={letter}
              type="button"
              aria-pressed={isSelected}
              aria-label={`Filter names starting with ${letter}`}
              onClick={() => onChange(letter)}
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-base font-normal leading-none transition-colors ${
                isSelected ? 'bg-main text-white' : 'text-dark'
              }`}
            >
              {letter}
            </button>
          )
        })}
      </div>
    </div>
  )
}
