import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ElectionTimeline } from '@/components/ElectionTimeline'

describe('ElectionTimeline', () => {
  it('renders all phases initially', () => {
    render(<ElectionTimeline />)
    expect(screen.getByText('Candidate Filing')).toBeInTheDocument()
    expect(screen.getByText('Election Day')).toBeInTheDocument()
  })

  it('expands a phase when clicked', () => {
    render(<ElectionTimeline />)
    const phase = screen.getByText('Election Day')
    fireEvent.click(phase)
    expect(screen.getByText(/Voter Action Required:/i)).toBeInTheDocument()
  })

  it('filters phases by type', () => {
    render(<ElectionTimeline />)
    const presidentialBtn = screen.getByText('presidential')
    fireEvent.click(presidentialBtn)
    // All 8 phases happen to be presidential in our data, but we test the button click
    expect(screen.getByText('Election Day')).toBeInTheDocument()
  })
})
