import { GENDER_OPTIONS } from '../../constants/filters'
import type { Gender } from '../../types/pet'

interface GenderSectionProps {
  value: Gender
  onChange: (gender: Gender) => void
}

export function GenderSection({ value, onChange }: GenderSectionProps) {
  return (
    <section className="flex flex-col items-center px-6 pb-12 pt-14">
      <h1 className="text-[1.75rem] font-normal leading-tight text-dark">
        Choose your pet&apos;s gender
      </h1>

      <div className="mt-8 flex gap-4">
        {GENDER_OPTIONS.map(({ value: optionValue, label }) => {
          const isSelected = value === optionValue

          return (
            <button
              key={optionValue}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onChange(optionValue)}
              className={`rounded-md border px-[16px] py-[10px] text-base font-normal leading-none transition-colors ${
                isSelected
                  ? 'border-main bg-main text-white'
                  : 'border-main bg-white text-main'
              }`}
            >
              {label}
            </button>
          )
        })}
      </div>
    </section>
  )
}
