interface FilterSubOptionsProps {
  options: { id: string; name: string }[];
  selectedCategoryIds: string[];
  onCategoryToggle: (categoryId: string) => void;
}

export function FilterSubOptions({
  options,
  selectedCategoryIds,
  onCategoryToggle,
}: FilterSubOptionsProps) {
  return (
    <div className="flex justify-center px-8 py-4">
      <div className="flex flex-wrap items-center gap-10">
        {options.map(({ id, name }) => {
          const isChecked = selectedCategoryIds.includes(id);

          return (
            <label
              key={id}
              className={`flex cursor-pointer items-center gap-2 text-base ${
                isChecked ? 'text-main' : 'text-dark-mid'
              }`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => onCategoryToggle(id)}
                className="sr-only"
              />
              <span
                className={`flex h-4 w-4 items-center justify-center border ${
                  isChecked ? 'border-main bg-main' : 'border-main bg-white'
                }`}
                aria-hidden="true"
              >
                {isChecked && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1 4L3.5 6.5L9 1"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
              {name}
            </label>
          );
        })}
      </div>
    </div>
  );
}
