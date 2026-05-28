import type { ReactNode } from 'react';
import type { PetName } from '../../types/pet';
import {
  getCategoryLabel,
  getGenderSymbol,
  getRelatedNames,
  stripHtml,
} from '../../utils/nameDetails';

interface AdditionalDetailsProps {
  pet: PetName;
}

function ShareIcon({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded-full bg-dark text-white transition-opacity hover:opacity-80"
    >
      {children}
    </button>
  );
}

export function AdditionalDetails({ pet }: AdditionalDetailsProps) {
  const categoryLabel = getCategoryLabel(pet);
  const relatedNames = getRelatedNames(pet);
  const definition = stripHtml(pet.definition);

  return (
    <article className="w-[28rem] max-w-[90vw] shrink-0">
      <div className="flex items-center gap-3 border-b border-border-light pb-4">
        <span className="text-xl text-dark" aria-hidden="true">
          {getGenderSymbol(pet.gender)}
        </span>
        <span className="text-base text-dark-mid">{categoryLabel}</span>
      </div>

      <p className="border-b border-border-light py-6 font-roboto text-base font-light leading-relaxed text-dark">
        {definition}
      </p>

      <div className="flex items-end justify-between pt-4">
        <div>
          <p className="text-sm font-bold text-dark-mid">Related name</p>
          <p className="mt-2 text-base text-dark-mid">
            {relatedNames.length > 0 ? relatedNames.join(' - ') : '—'}
          </p>
        </div>

        <div className="flex gap-2">
          <ShareIcon label="Copy link">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 8.5H4.5C3.12 8.5 2 7.38 2 6V4.5C2 3.12 3.12 2 4.5 2H6C7.38 2 8.5 3.12 8.5 4.5V6M5.5 5.5H9.5C10.88 5.5 12 6.62 12 8V9.5C12 10.88 10.88 12 9.5 12H5.5C4.12 12 3 10.88 3 9.5V8C3 6.62 4.12 5.5 5.5 5.5Z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </ShareIcon>

          <ShareIcon label="Share on Twitter">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M11.025 1.75H13.11L8.82 6.777L13.75 12.25H9.902L6.754 8.563L3.346 12.25H1.26L5.842 6.898L1.25 1.75H5.184L8.025 5.098L11.025 1.75ZM10.364 11.177H11.446L4.702 2.746H3.533L10.364 11.177Z" />
            </svg>
          </ShareIcon>

          <ShareIcon label="Share on Facebook">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8.523 7.438H10.25L11.375 4.813H8.523V3.062C8.523 2.352 8.523 1.75 9.773 1.75H11.375V0.098C11.375 0.098 10.258 0 9.195 0C6.961 0 5.477 1.316 5.477 3.703V4.813H3.25V7.438H5.477V14H8.523V7.438Z" />
            </svg>
          </ShareIcon>
        </div>
      </div>
    </article>
  );
}
