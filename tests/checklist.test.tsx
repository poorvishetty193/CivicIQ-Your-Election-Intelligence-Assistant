import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { VoterChecklist } from '@/components/VoterChecklist'

describe('VoterChecklist', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders all items', () => {
    render(<VoterChecklist />)
    expect(screen.getByText('Check registration status')).toBeInTheDocument()
    expect(screen.getByText('Tell a friend to vote!')).toBeInTheDocument()
  })

  it('toggles an item and persists in localStorage', () => {
    render(<VoterChecklist />)
    const checkbox = screen.getAllByRole('checkbox')[0]
    fireEvent.click(checkbox)
    
    const saved = JSON.parse(localStorage.getItem('civiciq_checklist') || '{}')
    expect(saved['Check registration status']).toBe(true)
  })
})
