import { describe, expect, it, beforeEach } from 'vitest'
import { initialPetNameState, usePetNameStore } from './usePetNameStore'

describe('usePetNameStore', () => {
  beforeEach(() => {
    usePetNameStore.setState(initialPetNameState)
  })

  it('starts with default state', () => {
    const state = usePetNameStore.getState()

    expect(state.gender).toBe('male')
    expect(state.selectedLetter).toBeNull()
    expect(state.openFilter).toBeNull()
    expect(state.selectedCategoryIds).toEqual([])
  })

  it('updates gender', () => {
    usePetNameStore.getState().setGender('female')

    expect(usePetNameStore.getState().gender).toBe('female')
  })

  it('updates selected letter', () => {
    usePetNameStore.getState().setSelectedLetter('A')

    expect(usePetNameStore.getState().selectedLetter).toBe('A')
  })

  it('toggles filter open and closed', () => {
    usePetNameStore.getState().toggleFilter('funny')
    expect(usePetNameStore.getState().openFilter).toBe('funny')

    usePetNameStore.getState().toggleFilter('funny')
    expect(usePetNameStore.getState().openFilter).toBeNull()
  })

  it('switches open filter when another is clicked', () => {
    usePetNameStore.getState().toggleFilter('funny')
    usePetNameStore.getState().toggleFilter('joyful')

    expect(usePetNameStore.getState().openFilter).toBe('joyful')
  })

  it('toggles category selection', () => {
    usePetNameStore.getState().toggleCategory('cat-1')
    expect(usePetNameStore.getState().selectedCategoryIds).toEqual(['cat-1'])

    usePetNameStore.getState().toggleCategory('cat-1')
    expect(usePetNameStore.getState().selectedCategoryIds).toEqual([])
  })

  it('accumulates multiple selected categories', () => {
    usePetNameStore.getState().toggleCategory('cat-1')
    usePetNameStore.getState().toggleCategory('cat-2')

    expect(usePetNameStore.getState().selectedCategoryIds).toEqual(['cat-1', 'cat-2'])
  })
})
