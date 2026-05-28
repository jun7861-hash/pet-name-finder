import { FILTER_OPTIONS } from '../../constants/filters';
import { usePetNameStore } from '../../store/usePetNameStore';
import { getCategoriesForFilterGroup } from '../../utils/categories';
import { FilterDropdown } from './FilterDropdown';
import { FilterSubOptions } from './FilterSubOptions';

function FilterBar() {
  const openFilter = usePetNameStore((state) => state.openFilter);
  const toggleFilter = usePetNameStore((state) => state.toggleFilter);

  return (
    <div className="flex h-[3.25rem] items-stretch">
      <div className="flex shrink-0 items-center px-7">
        <span className="text-base font-bold text-dark">Filters:</span>
      </div>

      {FILTER_OPTIONS.map(({ key, label }) => {
        const isOpen = openFilter === key;

        return (
          <div key={key} className="flex shrink-0 items-stretch">
            <FilterDropdown
              label={label}
              isOpen={isOpen}
              onClick={() => toggleFilter(key)}
            />
          </div>
        );
      })}
    </div>
  );
}

export function FiltersSection() {
  const openFilter = usePetNameStore((state) => state.openFilter);
  const selectedCategoryIds = usePetNameStore(
    (state) => state.selectedCategoryIds,
  );
  const toggleCategory = usePetNameStore((state) => state.toggleCategory);

  const subOptions = openFilter ? getCategoriesForFilterGroup(openFilter) : [];
  const isSubPanelOpen = openFilter !== null && subOptions.length > 0;

  return (
    <section className="border-y border-border-light bg-white [box-shadow:0_0_0_100vmax_#ffffff] [clip-path:inset(0_-100vmax)]">
      <div className="flex justify-center">
        <FilterBar />
      </div>

      {isSubPanelOpen && (
        <div className="bg-white">
          <FilterSubOptions
            options={subOptions}
            selectedCategoryIds={selectedCategoryIds}
            onCategoryToggle={toggleCategory}
          />
        </div>
      )}
    </section>
  );
}
