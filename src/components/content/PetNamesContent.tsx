import { useEffect, useState } from 'react'
import type { AlphabetLetter } from '../../constants/alphabet'
import { usePaginatedNames } from '../../hooks/usePaginatedNames'
import { usePetNameStore } from '../../store/usePetNameStore'
import { getNameByTitle } from '../../utils/nameDetails'
import { NamePicker } from '../names/NamePicker'
import { RandomDogImage } from '../names/RandomDogImage'
import { AdditionalDetails } from './AdditionalDetails'
import { AllPetsNamesHeading } from './AllPetsNamesHeading'
import { DefaultHero } from './DefaultHero'
import { AlphabetFilter } from '../search/AlphabetFilter'

function PetNamesList({ selectedLetter }: { selectedLetter: AlphabetLetter }) {
  const gender = usePetNameStore((state) => state.gender)
  const selectedCategoryIds = usePetNameStore((state) => state.selectedCategoryIds)

  const {
    nameTitles,
    listKey,
    total,
    hasMore,
    isLoading,
    isLoadingMore,
    error,
    loadMore,
  } = usePaginatedNames({
    letter: selectedLetter,
    gender,
    selectedCategoryIds,
  })

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    if (isLoading) {
      setSelectedIndex(0)
      setShowDetails(false)
    }
  }, [isLoading])

  useEffect(() => {
    setSelectedIndex(0)
    setShowDetails(false)
  }, [listKey])

  useEffect(() => {
    if (selectedIndex >= nameTitles.length && nameTitles.length > 0) {
      setSelectedIndex(nameTitles.length - 1)
    }
  }, [nameTitles.length, selectedIndex])

  const selectedName = nameTitles[selectedIndex] ?? null
  const selectedPet = selectedName ? getNameByTitle(selectedName) : undefined
  const showDogImage = !isLoading && nameTitles.length > 0 && selectedName !== null

  if (isLoading) {
    return <p className="text-xl text-dark-mid">Loading names...</p>
  }

  if (error && nameTitles.length === 0) {
    return <p className="text-xl text-dark-mid">{error}</p>
  }

  if (nameTitles.length === 0) {
    return <p className="text-xl text-dark-mid">No names match your filters.</p>
  }

  return (
    <>
      <div className="flex items-start gap-16">
        {!showDetails && showDogImage && selectedName && (
          <RandomDogImage
            refreshKey={selectedName}
            onClick={() => setShowDetails(true)}
          />
        )}

        <NamePicker
          names={nameTitles}
          selectedIndex={selectedIndex}
          onSelectedIndexChange={setSelectedIndex}
          hasMore={hasMore}
          isLoadingMore={isLoadingMore}
          onLoadMore={loadMore}
        />

        {showDetails && selectedPet && <AdditionalDetails pet={selectedPet} />}
      </div>

      <span className="sr-only">
        Showing {nameTitles.length} of {total} names
      </span>
    </>
  )
}

export function PetNamesContent() {
  const selectedLetter = usePetNameStore((state) => state.selectedLetter)
  const setSelectedLetter = usePetNameStore((state) => state.setSelectedLetter)

  return (
    <section className="pt-8">
      <AllPetsNamesHeading />

      <div className="mt-6 flex w-screen justify-center [margin-left:calc(50%-50vw)]">
        <AlphabetFilter value={selectedLetter} onChange={setSelectedLetter} />
      </div>

      <div className="mt-16 flex justify-center">
        {selectedLetter === null ? (
          <DefaultHero />
        ) : (
          <PetNamesList selectedLetter={selectedLetter} />
        )}
      </div>
    </section>
  )
}
