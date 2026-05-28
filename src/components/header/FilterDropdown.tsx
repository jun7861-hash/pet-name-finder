import { ChevronDownIcon } from '../icons/ChevronDownIcon';
import { ChevronUpIcon } from '../icons/ChevronUpIcon';

interface FilterDropdownProps {
  label: string;
  isOpen?: boolean;
  onClick?: () => void;
}

export function FilterDropdown({
  label,
  isOpen = false,
  onClick,
}: FilterDropdownProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={isOpen}
      className={`flex h-full items-center gap-2 whitespace-nowrap px-7 py-3.5 text-base font-normal transition-colors ${
        isOpen
          ? 'relative z-10 -mb-px border-b-2 border-white bg-white text-main'
          : 'text-dark-mid hover:text-dark'
      }`}
    >
      <span>{label}</span>
      {isOpen ? (
        <ChevronUpIcon className="shrink-0 text-main" />
      ) : (
        <ChevronDownIcon className="shrink-0 text-dark-mid" />
      )}
    </button>
  );
}
