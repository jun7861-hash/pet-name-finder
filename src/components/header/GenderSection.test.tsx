import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { GenderSection } from './GenderSection'

describe('GenderSection', () => {
  it('renders gender options', () => {
    render(<GenderSection value="male" onChange={vi.fn()} />)

    expect(screen.getByRole('heading', { name: /choose your pet's gender/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Male' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'Female' })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByRole('button', { name: 'Both' })).toHaveAttribute('aria-pressed', 'false')
  })

  it('calls onChange when a gender is selected', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<GenderSection value="male" onChange={onChange} />)

    await user.click(screen.getByRole('button', { name: 'Female' }))

    expect(onChange).toHaveBeenCalledWith('female')
  })
})
