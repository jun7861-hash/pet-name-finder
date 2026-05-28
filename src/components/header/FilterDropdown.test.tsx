import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { FilterDropdown } from './FilterDropdown'

describe('FilterDropdown', () => {
  it('renders closed state with down chevron', () => {
    render(<FilterDropdown label="Funny" isOpen={false} onClick={vi.fn()} />)

    const button = screen.getByRole('button', { name: 'Funny' })
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })

  it('renders open state with expanded aria attribute', () => {
    render(<FilterDropdown label="Funny" isOpen onClick={vi.fn()} />)

    const button = screen.getByRole('button', { name: 'Funny' })
    expect(button).toHaveAttribute('aria-expanded', 'true')
  })

  it('calls onClick when pressed', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(<FilterDropdown label="Funny" isOpen={false} onClick={onClick} />)

    await user.click(screen.getByRole('button', { name: 'Funny' }))

    expect(onClick).toHaveBeenCalledOnce()
  })
})
