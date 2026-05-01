import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { QuizEngine } from '@/components/QuizEngine'

describe('QuizEngine', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders the first question', () => {
    render(<QuizEngine />)
    expect(screen.getByText(/Question 1 of 15/i)).toBeInTheDocument()
    expect(screen.getByText(/In what year was the 19th Amendment ratified/i)).toBeInTheDocument()
  })

  it('allows selecting an option', () => {
    render(<QuizEngine />)
    const option = screen.getByText('1920')
    fireEvent.click(option)
    expect(screen.getByText(/Explanation:/i)).toBeInTheDocument()
  })
})
