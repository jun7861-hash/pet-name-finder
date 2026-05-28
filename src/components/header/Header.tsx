import { usePetNameStore } from '../../store/usePetNameStore'
import { GenderSection } from './GenderSection'

export function Header() {
  const gender = usePetNameStore((state) => state.gender)
  const setGender = usePetNameStore((state) => state.setGender)

  return (
    <header>
      <GenderSection value={gender} onChange={setGender} />
    </header>
  )
}
