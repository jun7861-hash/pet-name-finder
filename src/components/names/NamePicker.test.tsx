import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { NamePicker } from './NamePicker'

describe('NamePicker', () => {
  const names = ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo']

  it('highlights the selected name', () => {
    render(
      <NamePicker
        names={names}
        selectedIndex={2}
        onSelectedIndexChange={vi.fn()}
      />,
    )

    expect(screen.getByRole('button', { name: 'Charlie' })).toHaveAttribute('aria-current', 'true')
  })

  it('selects a name when clicked', async () => {
    const user = userEvent.setup()
    const onSelectedIndexChange = vi.fn()

    render(
      <NamePicker
        names={names}
        selectedIndex={2}
        onSelectedIndexChange={onSelectedIndexChange}
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Bravo' }))

    expect(onSelectedIndexChange).toHaveBeenCalledWith(1)
  })

  it('moves to the next name with the down control', async () => {
    const user = userEvent.setup()
    const onSelectedIndexChange = vi.fn()

    render(
      <NamePicker
        names={names}
        selectedIndex={2}
        onSelectedIndexChange={onSelectedIndexChange}
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Next name' }))

    expect(onSelectedIndexChange).toHaveBeenCalledWith(3)
  })

  it('moves to the previous name with the up control', async () => {
    const user = userEvent.setup()
    const onSelectedIndexChange = vi.fn()

    render(
      <NamePicker
        names={names}
        selectedIndex={2}
        onSelectedIndexChange={onSelectedIndexChange}
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Previous name' }))

    expect(onSelectedIndexChange).toHaveBeenCalledWith(1)
  })
})
