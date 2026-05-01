import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { QuizEngine } from '@/components/QuizEngine'

describe('QuizEngine', () => {
  beforeEach(() => {
    // Mock Math.random to return 0.5 so sort(() => Math.random() - 0.5) returns 0
    // This prevents the array from shuffling during tests
    vi.spyOn(Math, 'random').mockReturnValue(0.5)
    localStorage.clear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders the first question', () => {
    render(<QuizEngine />)
    expect(screen.getByText(/Question 1 of 10/i)).toBeInTheDocument()
    expect(screen.getByText('In what year was the 19th Amendment ratified, granting women the right to vote?')).toBeInTheDocument()
  })

  it('allows selecting an option', () => {
    render(<QuizEngine />)
    const option = screen.getByText('1920')
    fireEvent.click(option)
    expect(screen.getByText(/Explanation:/i)).toBeInTheDocument()
  })
})
